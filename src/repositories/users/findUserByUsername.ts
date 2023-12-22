import { prisma } from "../../helper/prisma";

export const findUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
