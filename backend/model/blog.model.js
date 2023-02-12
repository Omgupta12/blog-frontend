const { Schema, model } = require("mongoose");

const BlogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: {type: Date,default: Date.now},
  image: {type:String},
});

const BlogModel = model("blog", BlogSchema);

module.exports = BlogModel;
