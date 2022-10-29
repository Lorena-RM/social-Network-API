const { Schema, model } = require("mongoose");
 const thoughtSchema = require('./Thought')

const userSchema = new Schema(
    {
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
            return /^[a-zA-Z0-9_\.-]+@[\da-zA-Z\.-]+\.[a-z\.]{2,6}$/.test(e);
            }
        }
    },
    thoughts: [thoughtSchema],
    friends: [{type: Schema.Types.ObjectId, ref: "friend"}]
    },
    {
        toJSON: {
        virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model('user', userSchema);

model.exports = User;