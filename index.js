const validate = require('validate.js');

const _        = require('lodash');
const Token    = require('./token');

const Payment   = require('./payments');


class StanbicApi {
    constructor(options){
     this.options = _.cloneDeep(options);

     validate.validators.isString= function(value,options,key, attributes){
         return validate.isEmpty(value) || validate.isString(value) ? null : " must be a string";
     };
    const constraints ={
        client_id:{
            presence:true,
            isString: true
        },
        client_secret:{
            presence:true,
            isString:true
        }

    };
    const error = validate(this.options, constraints);
      if(error){
        throw error;
      }
      this.Token= new Token(this.options);
      this.PAYMENTS = new Payment(this.options);
      this.PAYMENT = this.PAYMENTS
    }
}

module.exports = function(options){
    return new StanbicApi(options);
}