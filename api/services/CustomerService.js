const chunkSize = 5000;
const csvHeaderToColumnMap = {
    'Customer Id' : 'customer_id',
    'First Name' : 'first_name',
    'Last Name' : 'last_name',
    'Company' : 'company',
    'City' : 'city',
    'Country' : 'country',
    'Phone 1' : 'phone1',
    'Phone 2' : 'phone2',
    'Email' : 'email',
    'Subscription Date' : 'subscription_date',
    'Website' : 'website'
};

var checkValidData = (customerObj = {}) => {
    let info = {
        valid : false,
        msg : ""
    }

    if(!customerObj['customer_id'] || !customerObj['first_name'] || !customerObj['email']) {
        info['msg'] = 'Required Field missing';
        return info;
    }

    info['valid'] = true;
    return info;
}

var insertCustomerData = async (customerData = []) => {
    try {
        if(customerData.length === 0) return {success : 0, failed: 0};

        let valueSqlArr = [];
        let params = [];
        let idx = 0;
        for(let elem of customerData) {
            // valueSqlArr.push(`('${elem['customer_id']}', '${elem['first_name']}', '${elem['last_name']}', '${elem['company']}', '${elem['city']}', '${elem['country']}', '${elem['phone1']}', '${elem['phone2']}', '${elem['email']}', '${elem['subscription_date']}', '${elem['website']}') `);
            valueSqlArr.push(`($${idx+1}, $${idx+2},  $${idx+3}, $${idx+4}, $${idx+5}, $${idx+6},  $${idx+7}, $${idx+8}, $${idx+9},  $${idx+10},  $${idx+11}) `);
            params.push(
                elem['customer_id'],
                elem['first_name'],
                elem['last_name'],
                elem['company'],
                elem['city'],
                elem['country'],
                elem['phone1'],
                elem['phone2'],
                elem['email'],
                elem['subscription_date'] || null,
                elem['website']
            );
            idx += 11;
        }
        let insertSql = `INSERT INTO customers (customer_id, first_name, last_name, company, city, country, phone1, phone2, email, subscription_date, website) VALUES ${valueSqlArr.join(", ")}
            ON DUPLICATE KEY UPDATE first_name = VALUES(first_name), last_name = VALUES(last_name), company = VALUES(company), city = VALUES(city), country = VALUES(country),
            phone1 = VALUES(phone1), phone2 = VALUES(phone2), email = VALUES(email), subscription_date = VALUES(subscription_date), website = VALUES(website);
        `;

        // console.log(insertSql);
        await sails.getDatastore("master").sendNativeQuery(insertSql, params);
        return {success : customerData.length, failed: 0}; 
    } catch (error) {
        console.error(error);
        return {success : 0, failed: customerData.length}; 
    }
}


module.exports = {

    validateCustomerData : async(customerData = []) => {
        let data = {
            valid : [],
            invalid : []
        };

        for(let elem of customerData) {
            let customerObj = {};
            for(let cvsKey in csvHeaderToColumnMap) customerObj[csvHeaderToColumnMap[cvsKey]] = elem[cvsKey] || '';
            let info = checkValidData(customerObj);
            if(info.valid) data.valid.push(customerObj);
            else data.invalid.push(customerObj);
        }
        return data;
    },


    addCustomerData : async(customerData = []) => {
        return new Promise(async(resolve, reject) => {
            let info = {success_count : 0, failed_count : 0};
            if(customerData.length === 0) return resolve(info);
            let promiseArr = [];
            while(customerData.length > 0) {
                let remainingCustomerData = customerData.splice(chunkSize);
                promiseArr.push(insertCustomerData(customerData), );
                customerData = remainingCustomerData;
            }

            Promise.allSettled((promiseArr)).then((results) => {
                results.forEach((result) => {
                    if(result.status == 'fulfilled') {
                        info.success_count += result.value.success;
                        info.failed_count += result.value.failed;
                    } 
                });
                return resolve(info);
            });
        });

    }
}