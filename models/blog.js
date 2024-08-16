const mongoose = require('mongoose')
const Schema = mongoose.Schema    // schema is a kind of constructor

const blogSchema = new Schema({
    title: {
        type: String,
        required: true},
    snippet:{
       type: String,
        required: true },
    body:{
        type: String,
        required: true
    }
}, {timestamps: true})       // creates new instance of the schema

const Blog = mongoose.model('Blog', blogSchema)  //Takes 2 arguements first one name of the data base colloection and pluralises it
module.exports = Blog