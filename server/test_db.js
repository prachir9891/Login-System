const mongoose = require('mongoose');
const uri = "mongodb+srv://loginuser:login%40123@login-register-dashboard.gup6h4u.mongodb.net/?appName=login-register-dashboard";

console.log('Testing connection to:', uri);
mongoose.connect(uri)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAILURE: Could not connect to MongoDB');
    console.error(err);
    process.exit(1);
  });
