import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface user {
  data: {
    first_name: String;
    last_name: String;
    email: String;
    user_name: String;
    password: String;
  };
}

async function main() {
  const user = await prisma.user.create({
    data: {
      first_name: "Brian",
      last_name: "Ho",
      email: "briantkho@gmail.com",
      user_name: "bho",
      password: "admin",
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
