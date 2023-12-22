import { findUserByEmail } from "../../repositories/users/findUserByEmail";
import { findUserByUsername } from "../../repositories/users/findUserByUsername";

export const loginUserAction = async (
  usernameOrEmail: string,
  password: string
) => {
  try {
    let user;

    if (usernameOrEmail.includes("@")) {
      user = await findUserByEmail(usernameOrEmail);
    } else {
      user = await findUserByUsername(usernameOrEmail);
    }

    if (!user) {
      return {
        status: 404,
        message: "Account not found",
      };
    }

    if (user.isDeleted) {
      return {
        status: 400,
        message: "Account deleted",
      };
    }

    if (user.password !== password) {
      return {
        status: 400,
        message: "Invalid credentials",
      };
    }

    return {
      status: 200,
      message: "login success",
      data: user,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
