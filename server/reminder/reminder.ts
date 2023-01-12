import express from 'express';
import { PrismaInstance } from '../utils/prisma';
import { createReminderValidator } from './validate';

const router = express.Router();
const prismaInstance = new PrismaInstance();

prismaInstance.createInstance();
const client = prismaInstance.getInstance();

router.post('/reminder', async (req, res) => {
  const { habit_id, task_id, ...restData } = req.body;

  const data = createReminderValidator.safeParse({
    ...restData,
  });

  if (!data.success) return res.status(400).send(data.error);

  const reminder = await client.reminder.create({
    data: {
      reminder_time: new Date(data.data.reminder_time),
    },
  });

  await client.itemReminder.create({
    data: {
      habit_id: habit_id,
      task_id: task_id,
      reminder_id: reminder.reminder_id,
    },
  });

  res.send(reminder);
});

router.put('/reminder', async (req, res) => {
  const { reminder_id, ...restData } = req.body;

  const reminder = await client.reminder.update({
    where: {
      reminder_id: reminder_id,
    },
    data: {
      reminder_time: new Date(restData.reminder_time),
    },
  });

  res.send(reminder);
});

router.delete('/reminder', async (req, res) => {
  if (!req.body.reminder_id) throw new Error('Please enter a reminder');
  const reminder_id = req.body.reminder_id;

  await client.reminder.delete({
    where: {
      reminder_id: reminder_id,
    },
  });

  res.sendStatus(200);
});

router.get('/reminder', async (req, res) => {
  if (!req.body.reminder_id) throw new Error('Please enter a reminder');
  const reminder_id = req.body.reminder_id;

  const reminder = await client.reminder.findUniqueOrThrow({
    where: {
      reminder_id: reminder_id,
    },
  });

  return res.send(reminder);
});

router.get('/reminders', async (req, res) => {
  if (!req.body.habit_id) throw new Error('Please enter a habit');
  const habit_id = req.body.habit_id;

  const reminders = await client.itemReminder.findMany({
    where: {
      habit_id: habit_id,
    },
  });

  return res.send(reminders);
});

router.get('/taskReminders', async (req, res) => {
  if (!req.body.task_id) throw new Error('Please enter a task');
  const task_id = req.body.task_id;

  const reminders = await client.itemReminder.findMany({
    where: {
      task_id: task_id,
    },
  });

  return res.send(reminders);
});

export default router;
