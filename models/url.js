const mongoose = require('mongoose')
const validator = require('validator')

const urlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(url) {
            if (!validator.isURL(url)) {
                throw new Error('invalid url')
            }
        }
    },
    short_url: {
        type: Number,
        required: true,
        unique: true
    }
})

urlSchema.pre('save', async function (next) {
    const url = this

    url.short_url = URL.countDocuments({}) + 1

    next()
})

const URL = mongoose.model('URL', urlSchema)

module.exports = URL

