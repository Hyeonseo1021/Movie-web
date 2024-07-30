const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.userSignup = async (req, res) => {
  const { id, nickname, password } = req.body;

  if (!id || !nickname || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res.status(400).json({ success: false, message: '이미 존재하는 유저입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    const newUser = new User({ id, nickname, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ success: true, message: '가입되었습니다.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllusers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 로그인 컨트롤러
exports.userSignin = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({ success: true, message: 'Signin successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};