const bcrypt = require('bcrypt');
const { User } = require('../utils/mongoose/model');
const saltRound = 10;

const registerUser = async (req, res) => {
  try {
    const userRegisterData = req.body;

    if (!userRegisterData.email) {
      return res.status(400).json({ error: 'Please provide an email' });
    }

    const existingUser = await User.findOne({ email: userRegisterData.email });

    if (existingUser) {
      console.log('User with this Email already exists');
      return res.status(400).json({ error: `User with ${userRegisterData.email} already exists` });
    }

    const hashedPassword = await bcrypt.hash(userRegisterData.password, saltRound);

    const newUser = new User({
      username: userRegisterData.username,
      email: userRegisterData.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log('User registered Successfully');

    return res.status(200).json({
      success: 'User registered successfully',
      user: {
        username: savedUser.username,
        email: savedUser.email,
        userApiKeys: savedUser.userApiKeys,
        googleSheetIds: savedUser.googleSheetIds,
      },
    });
  } catch (error) {
    console.error('Error registering a user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerUser };
