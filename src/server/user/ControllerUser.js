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
    const  userInfo = await userLogin(req.body);
    return responseHelper(req, res, null, userInfo);
  } catch (error) {
    return responseHelper(req, res, error);
  }
});

router.post(
  "/register",
  validator(USER_REGISTER_VALIDATION),
  async (req, res) => {
    try {
      await userRegister(req.body);
      return responseHelper(req, res, null, {});
    } catch (error) {
      return responseHelper(req, res, error);
    }
  }
);

export default router;
