const bcrypt = require('bcrypt');
const { User } = require('../utils/mongoose/model');

const login = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.email || !userData.password) {
      return res.status(400).json({ error: 'Please provide both email and password' });
    }

    const result = await User.findOne({ email: userData.email });

    if (!result) {
      return res.status(400).json({ error: `Could not find ${userData.email} in the database` });
    }

    const isEqual = await bcrypt.compare(userData.password, result.password);

    if (isEqual) {
      return res.status(200).json({
        success: 'User logged in',
        user: {
          username: result.username,
          email: result.email,
          userApiKeys: result.userApiKeys,
          googleSheetIds: result.googleSheetIds,
        },
      });
    } else {
      return res.status(400).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error while logging in user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { login };
