import { prisma } from "../../helper/prisma";
import { IUser } from "../../types/user.type";

export const createUser = async (data: IUser) => {
  try {
    const { email, username, password } = data;
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
