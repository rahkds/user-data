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
    req.file('file').upload({dirname : '/tmp/', maxBytes: 50000000}, async function(err, uploadedFiles) {
      if(err) return reject(err);
      let jsonData = await readcsvfiles(uploadedFiles[0].fd).catch(err => reject(err));
      return resolve(jsonData);
    }); 
  });
}

module.exports = {


  uploadCustomerData : async (req, res) => {
      try {
        let jsonData = await getCsvDataFromFile(req);
        let filterData = await CustomerService.validateCustomerData(jsonData);
        let addCustomerResp =  await CustomerService.addCustomerData(filterData.valid);
        let resObj = {
          success_count : addCustomerResp.success_count,
          failed_count : filterData.invalid.length + addCustomerResp.failed_count
        };
        return res.json(resObj);
      } catch (error) {
        return res.send(error);
      }
   },

   home: function(req,res){
    res.view({page_name : 'IGNORE'});
  }

}

  


     