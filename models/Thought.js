const { Schema, model, Types  } = require("mongoose");

const reactionSchema = new Schema(
    {
       reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
       },
       reactionBody: {
            type: String, 
            required: true, 
            minLength: 1,
            maxLength: 280,
       },
       username: {
            type: String, 
            required: true, 
       },
       createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {
                return new Date(timestamp).toLocaleString();
            }
       } 
    },
    {
        toJSON: {
        getters: true,
        virtuals: true,
        },
        id: false,
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {
                return new Date(timestamp).toLocaleString();
            }
        },
        username: {
            type: String, 
            required: true, 
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
        getters: true,
        virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;