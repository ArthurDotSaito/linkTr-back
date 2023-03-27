import joi from 'joi';

export const commentSchema = joi.object({
  comment:joi.string().required(),
  postId:joi.number().required()

});
