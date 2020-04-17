//jshint esversion: 8
const express = require("express");
const https = require("https");
const app = express();
var axios = require('axios');
app.use(express.static("public"));

var total_cases_data = [];

setInterval(function(){
  axios.all([
    axios.get('https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/Us'),
    axios.get('https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/Italy'),
    axios.get('https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/Spain'),
    axios.get('https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/China'),
    axios.get('https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/India'),
    axios.get('https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/Pakistan'),
  ]).then(axios.spread((res1, res2, res3, res4, res5, res6) => {

    total_cases_data = [];
    total_cases_data.push(res1.data.report.cases);
    total_cases_data.push(res2.data.report.cases);
    total_cases_data.push(res3.data.report.cases);
    total_cases_data.push(res4.data.report.cases);
    total_cases_data.push(res5.data.report.cases);
    total_cases_data.push(res6.data.report.cases);

    total_cases_data.push(res1.data.report.deaths);
    total_cases_data.push(res2.data.report.deaths);
    total_cases_data.push(res3.data.report.deaths);
    total_cases_data.push(res4.data.report.deaths);
    total_cases_data.push(res5.data.report.deaths);
    total_cases_data.push(res6.data.report.deaths);

    console.log("data loaded");
  })).catch(error => {
    console.log(error);
  });


},1000*15);

  app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
  });

  app.get("/case_data", function(req,res){
    res.send(JSON.stringify(total_cases_data));
  });
  app.get("/resources", function(req,res){
  res.sendFile(__dirname+"/gov_resources.html");
  });

  app.get("/state", function(req,res){
  var state_code = req.query.code;
  var direction = "/states_html/"+state_code+".html";
  res.sendFile(__dirname+direction);
});

app.listen(process.env.PORT || 4000, function(){
  console.log("listening on http://192.168.0.103:4000");
});
