import express from "express";
import { PrismaClient } from "@prisma/client";
import session from "express-session";

import { createSession, getSession } from "./session";
import type { UserType } from "./user";
import {
  createHabitReflectionValidator,
  createHabitValidator,
} from "./habit/validate";
import { createJournalValidator } from "./journal/validate";
import { createTaskValidator } from "./task/validate";

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
  const newUser: UserType = await client.user.create({
    data: {
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
  const email = req.body.email;
  const password = req.body.password;

  const findUsers: UserType[] | undefined = await client.user.findMany({
    where: { email: email },
  });

  if (!(findUsers && findUsers.length != 0)) return res.sendStatus(400);
  else if (findUsers.length > 1)
    console.log(`Multiple users with email ${email} found`);

  const user: UserType = findUsers[0];

  if (user.password !== password) return res.sendStatus(401);

  createSession(user, req);
  return res.sendStatus(200);
});

app.post("/signout", (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(`Could not destroy session: ${error}`);
    return res.sendStatus(200);
  });
});

app.post("/addHabit", async (req, res) => {
  const user = getSession(req);
  const data = createHabitValidator.safeParse({ ...req.body, uid: user.uid });
  if (!data.success) return res.status(400).send(data.error);

  const habit = await client.habit.create({
    data: {
      ...data.data,
      start_date: new Date(data.data.start_date),
      end_date: data.data.end_date ? new Date(data.data.end_date) : null,
    },
  });

  return res.send(habit);
});

app.post("/updateHabit", async (req, res) => {
  let { hid, ...data } = req.body;

  const habit = await client.habit.update({
    where: {
      habit_id: hid,
    },
    data: {
      ...data,
    },
  });

  return res.send(habit);
});

app.post("/addHabitReflection", async (req, res) => {
  const data = createHabitReflectionValidator.safeParse({
    ...req.body,
    habit_id: req.body.habit_id,
  });

  if (!data.success) return res.status(400).send(data.error);

  const reflection = await client.habitReflection.create({
    data: {
      ...data.data,
    },
  });

  return res.send(reflection);
});

app.post("/updateHabitReflection", async (req, res) => {
  let { hr_id, ...data } = req.body;

  const reflection = await client.habitReflection.update({
    where: {
      hr_id: hr_id,
    },
    data: {
      ...data,
    },
  });

  return res.send(reflection);
});

app.post("/createJournal", async (req, res) => {
  const user = getSession(req);

  const data = createJournalValidator.safeParse({
    ...req.body,
    uid: user.uid,
  });

  if (!data.success) return res.status(400).send(data.error);

  const journal = await client.journal.create({
    data: {
      ...data.data,
    },
  });

  return res.send(journal);
});

app.post("/updateJournal", async (req, res) => {
  const journal = await client.journal.update({
    where: {
      jid: req.body.jid,
    },
    data: {
      ...req.body,
    },
  });

  return res.send(journal);
});

app.post("/addTask", async (req, res) => {
  const data = createTaskValidator.safeParse({
    ...req.body,
    habit_id: req.body.hid,
  });

  if (!data.success) return res.status(400).send(data.error);

  const task = await client.task.create({
    data: {
      ...data.data,
    },
  });

  return res.send(task);
});

app.get("/", (req, res) => res.sendStatus(200));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
