import express from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import session from "express-session";

import { createSession } from "./session";
import type { User } from "./user";

const client = new PrismaClient();

const app = express();
const PORT = 3030;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.post("/signup", async (req, res) => {
  const newUser: User = await client.user.create({
    data: {
      uid: uuid(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
    },
  });

  createSession(newUser, req);
  return res.send(newUser);
});

app.post("/signin", async (req, res) => {
  const findUsers: User[] | undefined = await client.user.findMany({
    where: { email: req.body.email },
  });

  if (!(findUsers && findUsers.length != 0)) return res.sendStatus(400);
  else if (findUsers.length > 1)
    console.log(`Multiple users with email ${req.body.email} found`);

  const user: User = findUsers[0];

  if (user.password !== req.body.password) return res.sendStatus(401);

  createSession(user, req);
  return res.sendStatus(200);
});

app.post("/signout", (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(`Could not destroy session: ${error}`);
    return res.sendStatus(200);
  });
});

app.get("/", (req, res) => res.sendStatus(200));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
