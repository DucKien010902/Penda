import mongoose from "mongoose";
import crypto from "crypto";

import { v1 as uuidv1 } from "uuid";


const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    users_id: { type: String },
    users_sex: { type: String },
    usersdate_birthday: { type: String },
    users_fullname: { type: String },
    users_passport: { type: String },
    users_ssn: { type: String },
    users_origin: { type: String },
    users_code: { type: String },
    users_residence: { type: String },
    usersdate_expiry: { type: String },
    usersdate_start: { type: String },
    usersdate_begin: { type: String },
    users_name: { type: String },
    users_passwords: { type: String },
    users_name: { type: String },
    users_aliases: { type: String },
    users_phone: { type: String },
    users_fb: { type: String },
    users_mail: { type: String },
    users_bank: { type: String },
    users_banknumber: { type: String },
    users_sort: { type: String,default: "100" },
    users_level: { type: String },
    users_major: { type: String },
    users_function: { type: String, default: "Thử việc" },
    users_owner: { type: String, default: "Phòng sản xuất"},
    manage_view: { type: String,default: "project" },
    users_status: { type: String, default: "New" },
    users_salary: { type: String, default: "6000000" },
    users_subsidize: { type: String, default: "0" },
    users_comission: { type: String, default: "0" },
    users_salary_advance: { type: String, default: "0" },
    email: { type: String },
    users_image_url: { type: String },
  },
  { timestamps: true,
    collection: 'users'
   }
);

userSchema
  .virtual("users_password")
  .set(function (users_password) {
    this._password = users_password;
    this.salt = uuidv1();
    this.hashed_password = this.encrytPassword(users_password);
  })
  .get(function () {
    return this._password;
  });
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encrytPassword(plainText) === this.hashed_password;
  },
  encrytPassword: function (users_password) {
    if (!users_password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(users_password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

const User = mongoose.model("users", userSchema);
export default User;


