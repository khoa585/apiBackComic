import Joi from "joi";
export const VALIDATION_GET_LIST_COMIC = {
  options: { allowUnknownBody: false },
  body: {
    page: Joi.number().required(),
    type: Joi.number().required(),
    numberItem: Joi.number(),
  },
};
export const VALIDATION_SEARCH_COMIC = {
  options: { allowUnknownBody: false },
  body: {
    title: Joi.string(),
    category: Joi.string(),
    page: Joi.string().required(),
    numberItem: Joi.number(),
  },
};
export const VALIDATION_HIDDEN_COMIC = {
  options: { allowUnknownBody: false },
  body: {
    id: Joi.number().required(),
  },
};
export const VALIDATION_SHOW_COMIC = {
  options: { allowUnknownBody: false },
  body: {
    id: Joi.number().required(),
  },
};
