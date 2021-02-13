const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Web3 = require('web3');
const app = express();
const axios = require('axios');
var result = [];
var balance = 0;

var url = "https://api.etherscan.io/api" ;
const Key = "6DY79TDWHJRYS81MTCG8RBMCMVIH5ZGNMC";
var web3 = new Web3(new Web3.providers.HttpProvider(url));


// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// Homepage Route
app.get('/', (req, res) =>{
  res.render('index', {
    title: 'Ethereum App',
    result,
    balance
    });
});



app.post('/get', get);

var page = 0;

  
async function get(req, res){
  page = req.body.page == '' ? 1 : parseInt(req.body.page);
  var response = await axios.get(url+'?module=account&action=balance&address=' +req.body.address+ '&tag=latest&apikey='+ Key);

  balance = response.data.result;
  var response = await axios.get(url+'?module=account&action=txlist&address='+req.body.address+'&startblock='+req.body.blocknumber+'&page='+page+'&offset=10&sort=asc&apikey='+ Key);

  result = response.data.result;

  res.render('index', {
    title: 'Ethereum App',
    result,
    balance
  });
}
  
  





app.use('/static',express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


