import bcrypt from "bcrypt";
import { signJwt, verifyToken } from "../utils/auth.js";
const saltRounds = 10;

export const signin = async (req, res) => {
  try {
    const UsersCollection = req.mongoConn.collection("users");
    if (!req.body.firstName) {
      res.status(404).json({ err: "enter firstName" });
      return;
    }
    if (!req.body.lastName) {
      res.status(404).json({ err: "enter lastName" });
      return;
    }
    if (!req.body.address) {
      res.status(404).json({ err: "enter address" });
      return;
    }
    if (!req.body.email) {
      res.status(404).json({ err: "enter email" });
      return;
    }
    if (!req.body.password) {
      res.status(404).json({ err: "enter password" });
      return;
    }
    if (req.body.email.length < 4) {
      res.status(404).json({ err: " len of password < 4" });
      return;
    }
    const hashed = await bcrypt.hash(req.body.password, saltRounds);

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      email: req.body.email,
      password: hashed,
    };

    console.log(user);
    const result = await UsersCollection.insertOne(user);
    console.log(result);
    const u = await UsersCollection.findOne({ _id: result.insertedId });
    res.status(200).json({ success: true, data: u });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "error",
        data: null,
        message: "A user with this email already exists",
      });
    }
    res.status(500).json({ msg: "error: " + err.message, data: null });
  }
};

export const getusers = async (req, res) => {
  try {
    const mongoConn = req.mongoConn;
    const UsersCollection = mongoConn.collection("users");

    const usersArr = await UsersCollection.find().toArray();

    res.status(200).json({ msg: "success", data: usersArr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error: " + err.message, data: null });
  }
};

export const login = async (req, res) => {
  try {
    // POST /auth/login
    // req.body {password, email}
    // mongo find user
    // bcrypt - compare req.password, user.password
    // jwt - sign token {firstName, lastName, _id}
    // res.body -> token
    if (!req.body.email || !req.body.password) {
      res.status(404).json({ err: "enter password and email" });
      return;
    }
    const UsersCollection = req.mongoConn.collection("users");
    const usersArr = await UsersCollection.find().toArray();
    const user = usersArr.find((u) => u.email === req.body.email);
    if (!user) {
      res.status(404).json({ err: "User is not found" });
      return;
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(404).json({ err: "password id not good" });
      return;
    }
      const token = signJwt({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id.toString(),
    },);

      
    res.status(200).json({
      success: true,
      data: { token },
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ msg: "error: " + err.message, data: null });
  }
};
  


export const verifyd = async (req, res) => {
  try {
    const temp = verifyToken(req.body.token)
    
    res.status(200).json({
      success: true,
      data: temp,
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ msg: "error: " + err.message, data: null });
  }
};
  