//keys for prod env
module.exports = {
  // developer console google credentials for oauth google plus authentication using google strategy
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // mlab credentials for connecting with the database
  mongoURI: process.env.MONGO_URI,
  //cookie key
  cookieKey: process.env.COOKIE_KEY,
  //stripe keys
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY
};
