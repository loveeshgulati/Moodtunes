// const User = require('../models/userModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.signup = async (req, res) => {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     try {
//         const newUser = await User.create({ email, password: hashedPassword });
//         const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
//         res.json({ token });
//     } catch (err) {
//         res.status(400).json({ message: 'Signup failed' });
//     }
// };

// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//         res.json({ token });
//     } catch (err) {
//         res.status(400).json({ message: 'Login failed' });
//     }
// };

