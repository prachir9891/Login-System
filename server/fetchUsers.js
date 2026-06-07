const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const fetchUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}, '-password'); // Fetch all users, excluding passwords
    console.log('--- Registered Users Data ---');
    console.log(JSON.stringify(users, null, 2));
    console.log('-----------------------------');
    process.exit(0);
  } catch (err) {
    console.error('Error fetching users:', err);
    process.exit(1);
  }
};

fetchUsers();
