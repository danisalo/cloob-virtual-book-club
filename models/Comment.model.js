const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
    {
        event: {
            type: String
        },
        owner: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        bodyText: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = model("Comment", commentSchema)