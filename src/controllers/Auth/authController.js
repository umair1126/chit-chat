const User = require("../../model/user");
// const Email = require("../../utils/mailer");
// const ResetEmail = require("../../utils/resetMailer");

const {
  compareString,
  generateAccessToken,
  hashString,
  randomToken,
} = require("../../utils/helper");

class Auth {
  signup = async (req, res) => {
    try {
      console.log(req.body);
      //   console.log(req.params);
      let { name, email, address, password, phone, role } = req.body;
      const user = await User.findOne({ email });

      // console.log(user);
      if (user) {
        return res.status(400).json({
          status: "error",
          message: "email already exist!",
        });
      }

      const passwordHash = await hashString(password);
      const data = await User.create({
        name,
        email,
        address,
        phone,
        role: "user",
        password: passwordHash,
      });

      res.status(201).json({
        status: "success",
        message: "signup successfully!",
        data: data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  login = async (req, res) => {
    try {
      let { email, password } = req.body;
      console.log(req.body);

      const response = await User.findOne({ email });

      // console.log(response);
      if (response && compareString(password, response.password)) {
        let accessToken = generateAccessToken(response);
        // console.log(accessToken, "......");
        return res.status(200).json({
          status: "success",
          data: { accessToken, response },
          message: "login Successfully!",
        });
      } else {
        return res.status(403).json({
          status: "error",
          message: "Invalid credentials",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };
}

module.exports = new Auth();
