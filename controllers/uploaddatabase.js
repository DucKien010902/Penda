// Import model
import Etsy from '../models/etsy.js';
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from '../models/user.js';
import moment from "moment";
const now = moment.now;

export const create = (req, res) => {
  const etsy = [];


  address.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm etsy không thành công",
      });
    }
  });
};

