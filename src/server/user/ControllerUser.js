import express from "express";
import validator from "express-validation";
import {
  USER_REGISTER_VALIDATION,
  USER_LOGIN_VALIDATION,
} from "./ValidationUser";
import { responseHelper } from "../../common/responsiveHelper";
import { userRegister, userLogin } from "./ModelUser";

const router = express.Router();

router.post("/login", validator(USER_LOGIN_VALIDATION), async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    const token = await userLogin(user);
    console.log(token);
    if (!token) {
      throw new Error("please try again");
    }
    return responseHelper(req, res, token);
  } catch (error) {
    return responseHelper(req, res, error);
  }
});

router.post(
  "/register",
  validator(USER_REGISTER_VALIDATION),
  async (req, res) => {
    try {
      const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        email: req.body.email,
      };
      const token = await userRegister(user);
      if (!token) {
        throw new Error("Please try again");
      }
      return responseHelper(req, res, null, token);
    } catch (error) {
      return responseHelper(req, res, error);
    }
  }
);

export default router;
