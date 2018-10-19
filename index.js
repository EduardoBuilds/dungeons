const express = require('express')
var app = express()
var SQL = require('./utilities/postgres.js')

// app.use((req,res,next)=>{
// 	var s = new SQL()
// 	var d = new Date()
// 	var o = req.get('origin')
// 	if (o !== undefined) {
// 		s.insert('logs',{
// 			'requested':d.toISOString(),
// 			'origin':req.get('origin'),
// 			'user_agent':req.get('user-agent'),
// 			'ip':req.header('x-forwarded-for').split(',')[0] || req.connection.remoteAddress}
// 			)
// 	}
// 	next()
// })

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 4000,()=>{
	console.log('Working')
})