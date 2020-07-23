import express from "express";
const fileUpload = require("../../common/fileUpload");
import fs from "fs";
import path from "path";
import validator from "express-validation";
import {
  USER_REGISTER_VALIDATION,
  USER_LOGIN_VALIDATION,
} from "./ValidationUser";
import { AUTHEN_FAIL } from "../../constant/error";
import { responseHelper } from "../../common/responsiveHelper";
import { userRegister, userLogin, uploadAvatar } from "./ModelUser";

const router = express.Router();

router.post("/login", validator(USER_LOGIN_VALIDATION), async (req, res) => {
  try {
    const userInfo = await userLogin(req.body);
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

router.post("/upload", fileUpload.single("image"), async (req, res) => {
  try {
    if (!req.user) {
      throw new Error(AUTHEN_FAIL);
    }
    const userId = req.user._id;
    await uploadAvatar(userId, req.file.path);
    return responseHelper(req, res, null, null);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return responseHelper(req, res, error);
  }
});

export default router;
