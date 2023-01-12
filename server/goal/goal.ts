import express from 'express';
import { getSession } from '../session';
import { PrismaInstance } from '../utils/prisma';
import { createGoalValidator } from './validate';

const router = express.Router();
const prismaInstance = new PrismaInstance();

prismaInstance.createInstance();
const client = prismaInstance.getInstance();

router.post('/goal', async (req, res) => {
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

router.put('/goal', async (req, res) => {
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

router.delete('/goal', async (req, res) => {
  if (!req.body.goal_id) throw new Error('Please enter a goal');
  const goal_id = req.body.goal_id;

  await client.goal.delete({
    where: {
      goal_id: goal_id,
    },
  });

  res.sendStatus(200);
});

router.get('/goal', async (req, res) => {
  const { goal_id, ...data } = req.body;

  const goal = await client.goal.findFirstOrThrow({
    where: {
      goal_id: goal_id,
    },
  });

  return res.send(goal);
});

router.get('/goals', async (req, res) => {
  const user_id = getSession(req).user_id;
  const goals = await client.goal.findMany({ where: { user_id: user_id } });

  res.send(goals);
});

export default router;
