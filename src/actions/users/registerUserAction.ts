import { createUser } from "../../repositories/users/createUser";
import { findUsersByEmailAndUsername } from "../../repositories/users/findUsersByEmailAndUsername";
import { IUser } from "../../types/user.type";

export const registerUserAction = async (data: IUser) => {
  try {
    const { email, username } = data;
    const users = await findUsersByEmailAndUsername(email, username);

    if (users.length) {
      return {
        status: 400,
        message: "email or username already exist",
      };
    }

    await createUser(data);

    return {
      status: 200,
      message: "Register new user success",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
