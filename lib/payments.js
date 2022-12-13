const Token    = require('./token');
const validate = require('validate.js');
const _        = require('lodash');
const Common   = require('./common');
var unirest    = require('unirest');




class Payments {
    constructor(options){
    this.options=options;
    }
    processStk(params,results){
    let options = _.cloneDeep(params)
      return  new Promise(async function (resolve, reject){
         
        let body = {
            dbsReferenceId:options.dbsReferenceId,
            billAccountRef:options.billAccountRef,
            amount:options.amount,
            mobileNumber:options.mobileNumber,
        }
          let token = results;
            
        
        console.log(token,body)
        let rq=unirest.post(Common.STK_PUSH);
        rq.headers({
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/yaml'
        });
        rq.send(JSON.stringify(body))

        rq.end(function (resp) {
            if (resp.status === 201) {
                // API returns CREATED on success
                resolve(resp.body);
            } else {
                reject(resp.body || resp.error);
            }
        });
      })
}

processInterBankTransfer(params,results){
    
    return new Promise ( async function(resolve, reject){
        let token = results;
        console.log(token,params)
        let rq    = unirest.post(Common.INTER_BANK)
        
        rq.headers({
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'

        })
        rq.send(JSON.stringify(params));
        rq.end(function (resp) {
            if (resp.status === 201) {
                // API returns CREATED on success
                resolve(resp.body);
            } else {
                reject(resp.body || resp.error);
            }
        });
    })

}

processSendToMobile(params,results){
    return new Promise (async function (resolve, reject){
    
     let token = results;
     console.log(token, params)
    
     let rq= unirest.post(Common.SEND_MONEY);
     rq.headers({
        Authorization:`Bearer ${token}`,
        'Content-Type':'application/json'

     })
     rq.send(JSON.stringify(params));
     rq.end(function (resp) {
         if (resp.status === 201) {
             // API returns CREATED on success
             resolve(resp.body);
         } else {
             reject(resp.body || resp.error);
         }
     });

    })
}


processStanbicAccount(params, results){
     return new Promise (async function(resolve, reject){
        let token = results;
        console.log(token, params)
        let rq = unirest.post(Common.BANK_PAYMENT);
        rq.headers({
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        });
        rq.send(JSON.stringify(params));
        rq.end(function (resp) {
         if (resp.status === 201) {
             // API returns CREATED on success
             resolve(resp.body);
         } else {
             reject(resp.body || resp.error);
         }
     });

     })

}
}



module.exports = Payments;

