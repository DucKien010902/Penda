import User from '../models/user.js';
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import expressJwt from "express-jwt"; // Kiểm tra đăng nhập

export const signup = async (req, res) => {
  try {
    const user = new User(req.body);
    let id = user.users_name + "_" + Math.floor(Math.random() * 10);
    user.users_id = id;
    user.users_passwords = user.users_password;
    user.email = user.users_mail;
    
    const savedUser = await user.save();
    res.json(savedUser);
    console.log('Đăng ký thành công');
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Không thể đăng ký tài khoản",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const email = req.body.users_mail;
    const users_password = req.body.users_password;
    console.log(email)
    // Tìm kiếm người dùng trong DB
    const user = await User.findOne({users_mail: email });
    
    if (!user) {
      console.log('!user');
      return res.status(400).json({
        error: "Tài khoản với email không tồn tại, hãy đăng ký tài khoản mới",
      });
    }
    
    // Kiểm tra mật khẩu
    if (!user.authenticate(users_password)) {
      return res.status(401).json({
        error: "Email hoặc mật khẩu nhập vào không chính xác",
      });
    }

    // Tạo token
    const token = jwt.sign({ _id: user._id }, 'duy');
    
    // Lưu token vào cookie
    res.cookie("t", token, { expire: new Date() + 9999 });

    // Lấy thông tin user để trả về client
    const { _id, users_name, users_mail, users_function } = user;
    return res.json({
      token,
      user: { _id, users_name, users_mail, users_function },
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Đã xảy ra lỗi trong quá trình đăng nhập",
    });
  }
};

export const verify = async (req, res) => {
  let token = req.body.token;
  if (!token) {
    return res.status(401).send("Bạn chưa đăng nhập");
  }

  try {
    const decoded = jwt.verify(token, "duy");
    
    if (decoded && decoded._id) {
      // Tìm kiếm user theo _id đã giải mã từ token
      const user = await User.findOne({ _id: decoded._id });
      
      if (!user) {
        return res.status(400).json({
          error: "Tài khoản không tồn tại",
        });
      }

      const data = {
        users_name: user.users_name,
        users_function: user.users_function,
        users_owner: user.users_owner,
        manage_view: user.manage_view,
        users_id: user._id,
      };
      
      res.json(data);
    }
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Tài khoản không tồn tại");
  }
};

export const requireSignin = expressJwt({
  secret: "duy",
  algorithms: ["HS256"],
  userProperty: "auth",
});

export const signout = (req, res) => {
  res.clearCookie("t");
  res.json({
    message: "Đăng xuất thành công",
  });
};

export const isAuth = async (req, res, next) => {
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  const token = data.split(" ");

  if (!token) {
    return res.status(401).send("Bạn chưa đăng nhập, không tồn tại token");
  }

  try {
    const decoded = jwt.verify(token[1], "duy");
    let user = req.profile && req.profile._id == decoded._id;
    
    if (!user) {
      return res.status(403).json({
        error: "Bạn chưa đăng nhập",
      });
    }

    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Token không chính xác");
  }
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "Bạn không có quyền truy cập trang này",
    });
  }
  next();
};
