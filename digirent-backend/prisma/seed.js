import { cars } from "./cars.js";
import db from "../db/db.js";
import bcrypt from "bcrypt";

async function main() {
  //NOTE hashpassword and create user
  const password = await bcrypt.hash("asdfasdf", 6);
  await db.user.create({
    data: {
      username: "admin",
      email: "admin@admin.com",
      password,
      contact: "01533891348",
      name: "Admin",
      role: "Admin",
    },
  });

  await db.vehicles.createMany({
    // @ts-ignore
    data: cars,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    db.$disconnect;
  });
