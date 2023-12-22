import { comparePasswords } from "../../helper/bcrypt";
import { excludeFields } from "../../helper/excludeFields";
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

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return {
        status: 400,
        message: "Invalid credentials",
      };
    }

    const dataWithoutPassword = excludeFields(user, ["password"]);

    return {
      status: 200,
      message: "login success",
      data: dataWithoutPassword,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
