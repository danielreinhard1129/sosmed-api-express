import { NextFunction, Request, Response } from "express";
import { loginUserAction } from "../../actions/users/loginUserAction";

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const result = await loginUserAction(usernameOrEmail, password);

    res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};
