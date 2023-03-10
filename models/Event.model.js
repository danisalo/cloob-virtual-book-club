const { Schema, model } = require("mongoose")

const eventSchema = new Schema(
    {
        date: {
            type: Date,
            unique: true,
        },
        bookId: {
            type: String,
        },
        participants: [{
            ref: 'User',
            type: Schema.Types.ObjectId
        }],
        comments: [{
            ref: 'Comment',
            type: Schema.Types.ObjectId
        }]
    },
    {
        timestamps: true
    }
)

module.exports = model("Event", eventSchema)