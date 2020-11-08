const mongoose = require('mongoose')
const { stringify } = require('querystring')
const Schema = mongoose.Schema
const presetSchema = new Schema({
    composerName:{type: String, required:true},
    title:{type: String, required:true},
    sounds:{type: Array, required: true},
    tempo:{type: Number, required: true}
},{timestamps: true})

const Preset = mongoose.model('Preset',presetSchema )

module.exports = Preset