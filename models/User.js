const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  email: {
    type: String, 
    required: true, 
    unique: true, 
    validate: {
        validator: function(e) {
          return /^[a-zA-Z0-9_\.-]+@[\da-zA-Z\.-]+\.[a-zA-Z\.]{2,6}$/.test(e);
        }
    }
  },
  thoughts: {

  },
  friends: {

  }
});

const User = model('user', userSchema);

model.exports = User;