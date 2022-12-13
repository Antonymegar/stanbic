const Common= require('./common')
const unirest  = require('unirest');
const _        = require('lodash');

  class Token{
    constructor(options){
        this.options = options;
    }

    generateToken(params){
        let options = _.cloneDeep(params)
         var _self= this;
         return new Promise(function (resolve, reject) {
           var body ={
              client_id:_self.options.client_id,
              client_secret:_self.options.client_secret,
              
           } 
           var rq = unirest.post(Common.AUTH_TOKEN_URL)
           rq.headers({
            'Content_Type':'application/x-www-form-urlencoded'
           })
           rq.send(body);
           rq.send('scope=payments')
           rq.send('grant_type=client_credentials')
           rq.end(function (resp) {
            if (resp.error){
                return reject(resp.error);
              
            }
         const response = JSON.parse(resp.raw_body);
         return   resolve(response.access_token);
        });

        })
    }
}

module.exports = Token;