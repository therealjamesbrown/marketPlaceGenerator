/**
 * 
 * ================================
 * ; Title: BCRS PROJECT
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: Application for Bobs Computer Repair Shop.
 * ================================
 * 
 */



/**
 * Require statements
 */
const express = require('express');
const http = require('http');
let https = require('follow-redirects').https;
let fs = require('fs');
let qs = require('querystring');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

//Import our APIs/Routes
const CatalogApi = require('./routes/catalog-api');
const InvoiceApi = require('./routes/invoice-api');
const RoleApi = require('./routes/role-api');
const SecurityQuestionsApi = require('./routes/securityQuestion-api');
const UserApi = require('./routes/user-api');
const RootCrudApi = require('./routes/root/crud-api');
const MarketPlaceCrudApi = require('./routes/marketplace/marketplaceCrud-api');
const SellerCrudApi = require('./routes/marketplace/seller/sellerCrud-api');
const BuyerCrudApi = require('./routes/marketplace/buyer/buyerCrud-api');
const SessionApi = require('./routes/session-api');
const PaymentsApi = require('./routes/payments/payments-api');
const PayPalCommerceApi = require('./routes/payments/PayPalCommerce/paypal-commerce-api');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

/**
 * Variables
 */
const port = 3000 || process.env.PORT; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://admin:admin@cluster0.jiil7.mongodb.net/BCRS?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection



/**
 * APIs
 */
app.use('/api/catalog', CatalogApi);
app.use('/api/invoices', InvoiceApi);
app.use('/api/roles', RoleApi);
app.use('/api/securityQuestions', SecurityQuestionsApi);
app.use('/api/users', UserApi);
app.use('/api/session', SessionApi);

//used to crud payments services such as PayPal/Stripe/Etc
app.use('/v1/api/payments', PaymentsApi);

//used to curd marketplaces from a root level
app.use('/api/root', RootCrudApi);
//used to crud marketplaces
app.use('/v1/api/marketplace', MarketPlaceCrudApi);

//used to crud sellers on a marketplace
app.use('/v1/api/marketplaces/seller', SellerCrudApi);

//used to crud buyers on a marketplace
app.use('/v1/api/marketplaces/buyer', BuyerCrudApi);

app.use('/v1/api/payments/paypal-commerce', PayPalCommerceApi)



/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
