import express from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import session from "express-session";

import type { UserSession } from "./session";

const client = new PrismaClient();

const app = express();
const PORT = 3030;

app.use(
  session({
    secret: "WAH",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("YEET");
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.post("/signup", async (req, res) => {
  const newUser = await client.user.create({
    data: {
      uid: uuid(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
    },
  });

  const userSession: UserSession = {
    uid: newUser.uid,
    user_name: newUser.user_name,
    email: newUser.email,
  };

  req.session.user = userSession;
  return res.send(newUser);
});

app.post("/signin", async (req, res) => {
  const findUser = await client.user.findMany({
    where: { email: req.body.email },
  });
  if (!(findUser && findUser.length != 0)) return res.sendStatus(400);
  return res.sendStatus(200);

  // Password, if wrong, 401
  // Create Session
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
