import Joi from "joi";

export const COMMENT_VALIDATION = {
  options: { allowUnknownBody: false },
  body: {
    comment: Joi.string().required(),
    chapterId: Joi.string().required(),
    comicId: Joi.string().required(),
    userData: Joi.object({
      name: Joi.string(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    }),
  },
};

export const REPLY_VALIDATION = {
  options: { allowUnknownBody: false },
  body: {
    replyText: Joi.string().required(),
    commentId: Joi.string().required(),
    userData: Joi.object({
      name: Joi.string(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    }),
  },
};
