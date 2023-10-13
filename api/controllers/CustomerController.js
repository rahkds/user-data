/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const csvtojson = require('csvtojson');

var readcsvfiles = function(path){
  return new Promise((resolve, reject) => {
    csvtojson().fromFile(path).then((jsonObj)=>{
      return resolve(jsonObj);
    }).catch(err => reject(err));
  });
}

var getCsvDataFromFile = async (req) => {
  return new Promise((resolve, reject) => {
    if(!req.file) return reject("Please upload file");
    console.time("File upload time");
    req.file('file').upload({dirname : '/tmp/', maxBytes: 500000000}, async function(err, uploadedFiles) {
      if(err) return reject(err);
      console.timeEnd("File upload time");
      console.time("Read File and convert to Json Time");
      let jsonData = await readcsvfiles(uploadedFiles[0].fd).catch(err => reject(err));
      console.timeEnd("Read File and convert to Json Time");
      return resolve(jsonData);
    }); 
  });
}

module.exports = {

  uploadCustomerData : async (req, res) => {
      try {
        console.time("Total Time");
        let jsonData = await getCsvDataFromFile(req);
        console.time("Validate Json Time");
        let filterData = await CustomerService.validateCustomerData(jsonData);
        console.timeEnd("Validate Json Time");
        console.time("Add data To Db Time");
        let addCustomerResp =  await CustomerService.addCustomerData(filterData.valid);
        console.timeEnd("Add data To Db Time");
        let resObj = {
          success_count : addCustomerResp.success_count,
          failed_count : filterData.invalid.length + addCustomerResp.failed_count
        };
        console.timeEnd("Total Time");        
        return res.view('customer/home', {
          resObj: resObj
        });
      } catch (error) {
        return res.send(error);
      }
   },

   home: function(req,res){
    res.view({page_name : 'IGNORE'});
  }

}

  


     