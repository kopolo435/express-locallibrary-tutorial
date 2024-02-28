const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLenght: 100 },
  family_name: { type: String, required: true, maxLenght: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("lifespan").get(function () {
  const birthDateFormated = this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
  const dateOfDeathFormated = this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
  return `${birthDateFormated} - ${dateOfDeathFormated}`;
});

AuthorSchema.virtual("birth_dateYMD").get(function () {
  const birthDateFormated = this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toISODate()
    : "";
  return birthDateFormated;
});

AuthorSchema.virtual("death_dateYMD").get(function () {
  const deathDateFormated = this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toISODate()
    : "";
  return deathDateFormated;
});

module.exports = mongoose.model("Author", AuthorSchema);
