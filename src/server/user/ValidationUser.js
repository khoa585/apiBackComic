import Joi from "joi";

export const USER_REGISTER_VALIDATION = {
  options: { allowUnknownBody: false },
  body: {
    password: Joi.string().min(6).required(),
    repeat_password: Joi.ref("password"),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
  },
};

export const USER_LOGIN_VALIDATION = {
  options: { allowUnknownBody: false },
  body: {
    password: Joi.string().min(6).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  },
};
