import express from 'express';
import { getSession } from '../session';
import { PrismaInstance } from '../utils/prisma';
import {
  createHabitReflectionValidator,
  createHabitValidator,
} from './validate';

const router = express.Router();
const prismaInstance = new PrismaInstance();

prismaInstance.createInstance();
const client = prismaInstance.getInstance();

router.post('/habit', async (req, res) => {
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

router.put('/habit', async (req, res) => {
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

router.delete('/habit', async (req, res) => {
  if (!req.body.habit_id) throw new Error('Please enter a habit');
  const habit_id = req.body.habit_id;

  await client.habit.delete({
    where: {
      habit_id: habit_id,
    },
  });

  res.sendStatus(200);
});

router.get('/habit', async (req, res) => {
  const habit_id = req.body.habit_id;

  const habit = await client.habit.findUniqueOrThrow({
    where: {
      habit_id: habit_id,
    },
  });

  return res.send(habit);
});

router.get('/habits', async (req, res) => {
  const user_id = getSession(req).user_id;
  const habits = await client.habit.findMany({
    where: {
      user_id: user_id,
    },
  });

  return res.send(habits);
});

router.get('/goalHabits', async (req, res) => {
  const goal_id = req.body.goal_id;
  const habits = await client.habit.findMany({
    where: {
      goal_id: goal_id,
    },
  });

  return res.send(habits);
});

router.post('/habitReflection', async (req, res) => {
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

router.put('/habitReflection', async (req, res) => {
  const { habit_reflection_id, ...data } = req.body;

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

router.delete('/habitReflection', async (req, res) => {
  if (!req.body.habit_reflection_id)
    throw new Error('Please enter a reflection');
  const habit_reflection_id = req.body.habit_reflection_id;

  await client.habitReflection.delete({
    where: {
      habit_reflection_id: habit_reflection_id,
    },
  });

  res.sendStatus(200);
});

router.get('/habitReflection', async (req, res) => {
  const habit_reflection_id = req.body.habit_reflection_id;

  const reflection = await client.habitReflection.findUniqueOrThrow({
    where: {
      habit_reflection_id: habit_reflection_id,
    },
  });

  return res.send(reflection);
});

router.get('/habitReflections', async (req, res) => {
  const habit_id = req.body.habit_id;

  const reflection = await client.habitReflection.findMany({
    where: {
      habit_id: habit_id,
    },
  });

  return res.send(reflection);
});

export default router;
