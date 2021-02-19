import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import {
  forgotPasswordEmailValidation,
  resetPasswordValidation,
} from '../middlewares/validations/request.validations';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  forgotPasswordEmailValidation,
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  resetPasswordValidation,
  resetPasswordController.create,
);

export default passwordRouter;
