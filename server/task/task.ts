import express from 'express';
import { PrismaInstance } from '../utils/prisma';
import { createTaskValidator } from './validate';

const router = express.Router();
const prismaInstance = new PrismaInstance();

prismaInstance.createInstance();
const client = prismaInstance.getInstance();

router.post('/task', async (req, res) => {
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

router.put('/task', async (req, res) => {
  const { task_id, ...data } = req.body;

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

router.get('/task', async (req, res) => {
  if (!req.body.task_id) throw new Error('Please enter a task');
  const task_id = req.body.task_id;

  const task = await client.task.findUniqueOrThrow({
    where: {
      task_id: task_id,
    },
  });

  return res.send(task);
});

router.delete('/task', async (req, res) => {
  if (!req.body.task_id) throw new Error('Please enter a task');
  const task_id = req.body.task_id;

  await client.task.delete({
    where: {
      task_id: task_id,
    },
  });

  res.sendStatus(200);
});

router.get('/tasks', async (req, res) => {
  if (!req.body.habit_id) throw new Error('Please enter a habit');
  const habit_id = req.body.habit_id;

  const tasks = await client.task.findMany({
    where: {
      habit_id: habit_id,
    },
  });

  return res.send(tasks);
});

export default router;
