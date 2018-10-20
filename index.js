const express = require('express')
const request = require('request')
var app = express()
var SQL = require('./utilities/postgres.js')

// app.use((req,res,next)=>{
// 	var s = new SQL()
// 	var d = new Date()
// 	var o = req.get('origin')
// 	if (o !== undefined) {
// 		request.get('http://api.ipstack.com/'
// 			+req.header('x-forwarded-for').split(',')[0]+'?access_key='+
// 			process.env.IPSTACK+'&fields=country_name,region_name',(err,res,body)=>{
// 				if (err){
// 					console.log(err)
// 				} else {
// 					var data = JSON.parse(body)
// 					s.insert('logs',{
// 						'requested':d.toISOString(),
// 						'origin':req.get('origin'),
// 						'user_agent':req.get('user-agent'),
// 						'country':data.country_name,
// 						'region':data.region_name
// 						})
// 				}
// 		})
// 	}
// 	next()
// })

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 4000,()=>{
	console.log('Working')
})