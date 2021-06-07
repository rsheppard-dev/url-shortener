const mongoose = require('mongoose')
const validator = require('validator')

const urlSchema = new mongoose.Schema({
    realUrl: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(url) {
            if (!validator.isURL(url)) {
                throw new Error('You must enter a valid URL!')
            }
        }
    },
    shortUrl: {
        type: Number,
        required: true
    }
})

const URL = mongoose.model('URL', urlSchema)

module.exports = URL

