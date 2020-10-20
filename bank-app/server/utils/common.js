const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/connect');

const isInvalidField = (receivedFields, validFieldsToUpdate) => {
  return receivedFields.some(
    (field) => validFieldsToUpdate.indexOf(field) === -1
  );
};

const validateUser = async (user_name, password) => {
  const result = await pool.query(
    'select userid,  user_name, password from bank_user where user_name = $1',
    [user_name]
  );
  const user = result.rows[0];
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      delete user.password;
      return user;
    } else {
      throw new Error();
    }
  } else {
    throw new Error();
  }
};

const generateAuthToken = async (user) => {
  const { userid, user_name } = user;
  const secret = process.env.secret;
  const token = await jwt.sign({ userid, user_name }, secret);
  return token;
};

module.exports = {
  isInvalidField,
  validateUser,
  generateAuthToken
};