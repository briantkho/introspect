import express from 'express';
import { getSession, createSession } from '../session';
import { PrismaInstance } from '../utils/prisma';
import { UserType } from './userType';
import { createUserValidator } from './validate';

const prismaInstance = new PrismaInstance();
prismaInstance.createInstance();

const client = prismaInstance.getInstance();

const router = express.Router();

router.post('/signup', async (req, res) => {
  const response = createUserValidator.safeParse({
    ...req.body,
  });

  if (!response.success) return res.status(400).send(response.error);

  const data = response.data;

  const findUsers = await client.user.findMany({
    where: { email: data.email },
  });

  if (findUsers.length > 0) throw new Error('Email already in use');

  const newUser = await client.user.create({
    data: {
      ...data,
    },
  });

  createSession(newUser, req);
  return res.send(newUser);
});

router.post('/signin', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const findUsers = await client.user.findMany({
    where: { email: email },
  });

  if (!(findUsers && findUsers.length != 0)) return res.sendStatus(400);
  else if (findUsers.length > 1)
    console.log(`Multiple users with email ${email} found`);

  const user = findUsers[0];

  if (user.password !== password) return res.sendStatus(401);

  createSession(user, req);
  return res.sendStatus(200);
});

router.post('/signout', (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(`Could not destroy session: ${error}`);
    return res.sendStatus(200);
  });
});

router.get('/user', async (req, res) => {
  const data = getSession(req);

  const user = await client.user.findUniqueOrThrow({
    where: {
      user_id: data.user_id,
    },
  });

  return res.send(user);
});

router.put('/user', async (req, res) => {
  const userSession = getSession(req);
  const data = req.body;

  if (!data.password) throw new Error('You can only change your password');

  const user = await client.user.update({
    where: {
      user_id: userSession.user_id,
    },
    data: {
      password: data.password,
    },
  });

  return res.send(user);
});

export default router;
