const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Nytehawk', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Here We Run Subscribe.js File
const subscribeRoute = require('./routes/Subscribe');
app.use(subscribeRoute);

// Here We Run Medicine.js File
const medicineRoute = require('./routes/Medicine');
app.use(medicineRoute);

// Here We Run Transaction.js File
const transactionRoute = require("./routes/Transaction");
app.use(transactionRoute);

// Here We Run app.js File
const contactRoute = require('./routes/app');
app.use(contactRoute)


// ✅ Define Mongoose Schema and Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  dob: String,
  password: String,
  pincode: String,
  house: String,
  area: String,
  landmark: String,
  city: String,
  state: String,

  relative1Name: String,
  relative1Phone: String,
  relative2Name: String,
  relative2Phone: String,
}, { timestamps: true });

const User = mongoose.model('SignupDetails', UserSchema);

// ✅ SIGNUP Route
app.post('/api/signup', async (req, res) => {
  const {
    name, email, phone, gender, dob, password,
    pincode, house, area, landmark, city, state,
    relative1Name, relative1Phone, relative2Name, relative2Phone
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = new User({
      name, email, phone, gender, dob, password,
      pincode, house, area, landmark, city, state,
      relative1Name, relative1Phone, relative2Name, relative2Phone
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'Signup successful', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Signup error' });
  }
});

// ✅ LOGIN Route (basic validation for now)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({ success: true, message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Login error' });
  }
});

app.put('/api/update', async (req, res) => {
  const { email, ...updateData } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User updated', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Update failed' });
  }
});

// ✅ Test route
app.get('/api/test', (req, res) => {
  res.send('API is working!');
});



// ✅ Start Server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
