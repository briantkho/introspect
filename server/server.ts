import express from "express";
import { PrismaClient } from "@prisma/client";
import session from "express-session";

import { createSession, getSession } from "./session";
import type { UserType } from "./user/user";
import {
  createHabitReflectionValidator,
  createHabitValidator,
} from "./habit/validate";
import { createJournalValidator } from "./journal/validate";
import { createTaskValidator } from "./task/validate";
import { createReminderValidator } from "./reminder/validate";
import { createGoalValidator } from "./goal/validate";

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
  const response = req.body;

  const findUsers: UserType[] | undefined = await client.user.findMany({
    where: { email: response.email },
  });

  if (findUsers.length > 0) throw new Error("Email already in use");

  const newUser: UserType = await client.user.create({
    data: {
      first_name: response.first_name,
      last_name: response.last_name,
      user_name: response.user_name,
      email: response.email,
      password: response.password,
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

app.post("/addGoal", async (req, res) => {
  const user = getSession(req);
  const data = createGoalValidator.safeParse({
    ...req.body,
    user_id: user.user_id,
  });

  if (!data.success) return res.status(400).send(data.error);

  const goal = await client.goal.create({
    data: {
      ...data.data,
      target_date: data.data.target_date
        ? new Date(data.data.target_date)
        : null,
    },
  });

  return res.send(goal);
});

app.post("/updateGoal", async (req, res) => {
  const { goal_id, ...data } = req.body;

  const goal = await client.goal.update({
    where: {
      goal_id: goal_id,
    },
    data: {
      ...data,
      target_date: data.target_date ? new Date(data.target_date) : null,
    },
  });

  return res.send(goal);
});

app.post("/addHabit", async (req, res) => {
  const user = getSession(req);
  const data = createHabitValidator.safeParse({
    ...req.body,
    user_id: user.user_id,
  });

  if (!data.success) return res.status(400).send(data.error);

  const habit = await client.habit.create({
    data: {
      ...data.data,
      start_date: data.data.start_date
        ? new Date(data.data.start_date)
        : undefined,
      end_date: data.data.end_date ? new Date(data.data.end_date) : null,
    },
  });

  return res.send(habit);
});

app.post("/updateHabit", async (req, res) => {
  const { habit_id, ...data } = req.body;

  const habit = await client.habit.update({
    where: {
      habit_id: habit_id,
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
  let { habit_reflection_id, ...data } = req.body;

  const reflection = await client.habitReflection.update({
    where: {
      habit_reflection_id: habit_reflection_id,
    },
    data: {
      ...data,
    },
  });

  return res.send(reflection);
});

app.post("/addJournal", async (req, res) => {
  const user = getSession(req);

  const data = createJournalValidator.safeParse({
    ...req.body,
    user_id: user.user_id,
  });

  if (!data.success) return res.status(400).send(data.error);

  const journal = await client.journal.create({
    data: {
      ...data.data,
      date: data.data.date ? new Date(data.data.date) : undefined,
    },
  });

  return res.send(journal);
});

app.post("/updateJournal", async (req, res) => {
  const journal = await client.journal.update({
    where: {
      journal_id: req.body.journal_id,
    },
    data: {
      ...req.body,
      date: req.body.date ? new Date(req.body.date) : undefined,
    },
  });

  return res.send(journal);
});

app.post("/addTask", async (req, res) => {
  const data = createTaskValidator.safeParse({
    ...req.body,
  });

  if (!data.success) return res.status(400).send(data.error);

  const task = await client.task.create({
    data: {
      ...data.data,
    },
  });

  return res.send(task);
});

app.post("/updateTask", async (req, res) => {
  let { task_id, ...data } = req.body;
  const task = await client.task.update({
    where: {
      task_id: task_id,
    },
    data: {
      ...data,
    },
  });

  return res.send(task);
});

app.post("/addReminder", async (req, res) => {
  const { habit_id, task_id, ...restData } = req.body;

  const data = createReminderValidator.safeParse({
    ...restData,
  });

  if (!data.success) return res.status(400).send(data.error);

  const reminder = await client.reminder.create({
    data: {
      ...data.data,
    },
  });

  const itemReminder = await client.itemReminder.create({
    data: {
      habit_id: habit_id,
      task_id: task_id,
      reminder_id: reminder.reminder_id,
    },
  });

  res.send(itemReminder);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
