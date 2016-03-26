var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//defining a scheme which will represent users of the application
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    role: String,
    date: Date
});

//encrypting a user chosen password so that the secure hash can be stored in the database
userSchema.methods.generateHash = function (passwrd) {
    return bcrypt.hashSync(passwrd, bcrypt.genSaltSync(9));
};

//method used during login which retrieves stored hash from the database, then
//hashes users typed input and compares them
userSchema.methods.validPassword = function (passwrd) {
    return bcrypt.compareSync(passwrd, this.password);
};

//model function will create a users collection in the database
var userModel = mongoose.model('User', userSchema);

//exporting a model to be available to other modules
module.exports = userModel;

//I decided to have 3 different roles in order for them
//to represent different types of user:
//1. guest - anyone visiting the site who hasn't yet registered - has limited access, can
//only view partial students info and cannot save new students to the database
//2. memeber - a regular user who has completed the process of registration - has full access 
//to students info and can insert new students into the database
//3. admin - in adition to having every possibilty a regular memeber has, an admin can insert
//new users to the database, delete them and also delete students - TO IMPLEMENT AN ADMIN INTERFACE