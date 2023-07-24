import { Response, Request } from "express";
import userModel from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../config/User";

export const loginUserController = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    await userModel.findOne({ email: email }).then((user : any) => {
      if (!user) return res.status(400).json({ message: "User Not Found" });
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Error Comparing Password" });
            if (result) {
                const token = generateToken({email: user.email, id: user._id, orgName: user.orgName, phoneNumber: user.phoneNumber, gstNumber: user.gstNumber, plan: user.plan})
                return res.status(200).json({ message: "User Logged In", token : token });
                
            }
          else return res.status(400).json({ message: "Password Incorrect" });
        });
      }
    }).catch(() => {
        res.status(500).json({ message: "Database is Down" });
    });
      
      
  } catch (e) {
    console.log(e);
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, orgName, phoneNumber, gstNumber, plan, password } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!orgName)
      return res.status(400).json({ message: "Organization Name is required" });
    if (!phoneNumber)
      return res.status(400).json({ message: "Phone Number is required" });
    if (!gstNumber)
      return res.status(400).json({ message: "GST Number is required" });
    if (!plan) return res.status(400).json({ message: "Plan is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    req.body.password = await bcrypt.hash(password, await bcrypt.genSalt(10));

    await userModel
      .create({
        email: email,
        orgName: orgName,
        phoneNumber: phoneNumber,
        gstNumber: gstNumber,
        plan: plan,
        password: password,
      })
      .then(() => {
        res.status(200).json({ message: "User Created" });
      })
      .catch((e) => {
        if (e.code === 11000)
          return res.status(400).json({ message: "User Already Exists" });
        res.status(500).json({ message: "Error Adding User in DB" });
      });
  } catch (e) {
    console.log(e);
  }
};
