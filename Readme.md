# Stanbic

Stanbic Payment APIs Node.js sdk

## Installation

Install the module  by executing:

    npm i stanbic_modules

## Usage

### Initialize Stanbic Client

---Node

## Set your app credentials
```
const credentials ={
    client_id: 'STANBIC_API_KEY',
    client_secret:'STANBIC_API_SECRET'
 
 }
 ```
 
 ```
 // Initialize the SDK
const StanBicPayments = require('./index')(credentials);

```

```
// Get the PAYMENTS Service
const payments= StanBicPayments.PAYMENTS;
```

```
// Get the Token Service
const token =StanBicPayments.Token;
```

### STK Push - M-Pesa Checkout
```
async function STK_PUSH(){
   const options ={
         dbsReferenceId: '',
         billAccountRef: '',
         amount: '',
         mobileNumber:''

    }
    try {
         const results= await token.generateToken(credentials);
            
        const result = await payments.processStk(options,results);

    }catch(err){
        console.log(err);
    }
}
 STK_PUSH();
 ```

- `mobileNumber`: customer being charged mobile number`REQUIRED`
- `dbsReferenceId`: This is your Uniqueid reference for each request`REQUIRED`
- `billAccountRef`: The Account number you want your customer to pay into. This is provided by the bank `REQUIRED`
- `amount`: amount being deducted from M-Pesa `REQUIRED`

## Development

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/Antonymegar/stanbic.git>
