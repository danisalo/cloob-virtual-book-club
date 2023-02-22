const { Schema, model } = require("mongoose")

const cloobSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            required: true,
            minLength: 2
        },
        description: {
            type: String,
            required: true,
        },
        maxParticipants: {
            type: Number,
            min: 1,
        },
        participants: [{
            ref: 'User',
            type: Schema.Types.ObjectId
        }],
        cover: {
            type: String,
            trim: true,
            // default: 'https://res.cloudinary.com/dle7ctrmn/image/upload/v1677081076/default-cloob_xxhtla.png'
        },
        host: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        events: [{
            ref: 'Event',
            type: Schema.Types.ObjectId
        }]
    },
    {
        timestamps: true
    }
)

module.exports = model("Cloob", cloobSchema)