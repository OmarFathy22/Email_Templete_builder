import mongoose from "mongoose";

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  templeteName: { type: String },
  username: { type: String },
  sender: { type: String },
  content: { type: String },
  link: { type: String },
  address: { type: String },
  textColor: { type: String },
  backgroundColor: { type: String },
  image: { type: String },
  subject: { type: String },
});

const Template = mongoose.model("Template", templateSchema);

export default Template;
