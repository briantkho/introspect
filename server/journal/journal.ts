import express from 'express';
import { getSession } from '../session';
import { PrismaInstance } from '../utils/prisma';
import { createJournalValidator } from './validate';

const router = express.Router();
const prismaInstance = new PrismaInstance();

prismaInstance.createInstance();
const client = prismaInstance.getInstance();

router.post('/journal', async (req, res) => {
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

router.put('/journal', async (req, res) => {
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

router.delete('/journal', async (req, res) => {
  if (!req.body.journal_id) throw new Error('Please enter a journal');
  const journal_id = req.body.journal_id;

  await client.journal.delete({
    where: {
      journal_id: journal_id,
    },
  });

  res.sendStatus(200);
});

router.get('/journal', async (req, res) => {
  const journal_id = req.body.journal_id;

  const journal = await client.journal.findUniqueOrThrow({
    where: {
      journal_id: journal_id,
    },
  });

  return res.send(journal);
});

router.get('/journals', async (req, res) => {
  const user_id = getSession(req).user_id;

  const journals = await client.journal.findMany({
    where: {
      user_id: user_id,
    },
  });

  return res.send(journals);
});

router.get('/goalJournals', async (req, res) => {
  const goal_id = req.body.goal_id;

  const journals = await client.journal.findMany({
    where: {
      goal_id: goal_id,
    },
  });

  return res.send(journals);
});

export default router;
