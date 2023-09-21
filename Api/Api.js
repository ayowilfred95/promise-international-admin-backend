const https = require('https')
const axios = require('axios')
// const ApiModel = require('./Api.model')


exports.InitializePayment = async(req,res) => {
  // try {
  //   const Body = req.body;
  //   const options = {
  //     url: "https://api.paystack.co/transaction/initialize",
  //     header: {
  //       Authorization: 'Bearer sk_test_0f78c2471fdb1e431185df74a273ed7127a83849',
  //       'Content-Type': 'application/json',
  //       "cache-control": "no-cache"
  //     },
  //     Body
  //   }
  //   request.post(options,(err,data) => {
  //     if(err) throw err;
  //     res.status(200).json(data)
  //   })
  // } catch (error) {
  //   throw error
  // }

  try {
    const params = req.body;
    // JSON.stringify({
    //   "email": req.query.email,
    //   "fullName": req.query.fullName,
    //   "amount": req.query.amount * 100,
    // })
    const data = await axios.post("https://api.paystack.co/transaction/initialize",params,{
      headers: {
        Authorization: "Bearer sk_test_0f78c2471fdb1e431185df74a273ed7127a83849",
        'Content-Type': 'application/json'
      }
    })
   
    // const payment = await ApiModel.create()
     res.status(200).json({
      status: "success",
      data: data
     })

  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: error
    })
  }
}

exports.verifyPayment = (req,res) => {}

// exports.InitializePayment = async(req,res) => {
//   const params = JSON.stringify({
//     "email": req.query.email,
//     "fullName": req.query.fullName,
//     "amount": req.query.amount,
//   })
  
//   const options = {
//     hostname: 'api.paystack.co',
//     port: 443,
//     path: '/transaction/initialize',
//     method: 'POST',
//     headers: {
//       Authorization: 'Bearer sk_test_0f78c2471fdb1e431185df74a273ed7127a83849',
//       'Content-Type': 'application/json'
//     }
//   }
  
//   const request = https.request(options, response => {
//     let data = ''
  
//     response.on('data', (chunk) => {
//       data += chunk
//     });
  
//     response.on('end', () => {
//       res.status(200).json(JSON.parse(data))
//     })
//   }).on('error', error => {
//     console.error(error)
//   })
  
//   request.write(params)
//   request.end()
// }

// exports.verifyPayment = (req,res) => {
// const options = {
//   hostname: 'api.paystack.co',
//   port: 443,
//   path: `/transaction/verify/${req.params.reference}`,
//   method: 'GET',
//   headers: {
//     Authorization: 'Bearer sk_test_0f78c2471fdb1e431185df74a273ed7127a83849'
//   }
// }

// https.request(options, response => {
//   let data = ''

//   response.on('data', (chunk) => {
//     data += chunk
//   });

//   response.on('end', () => {

//     res.json(JSON.parse(data))
//     // console.log(JSON.parse(data))
//   })
// }).on('error', error => {
//    res.status(400).json(error)
// })
// }