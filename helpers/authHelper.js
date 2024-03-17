const bcrypt = require("bcrypt");

const hashPassword = async(password)=> { //password passed as an argument
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); //the actual password turns to 10 different kind of encrypted password
    return hashedPassword;
  }catch(error) {
    console.log(error);
  }
}

const comparePassword = async = (password, hashedPassword) => { 
  return bcrypt.compare(password, hashedPassword); //comaparing the entered password to database password 
}

module.exports = {hashPassword, comparePassword};