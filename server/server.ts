import express from 'express';
import session from 'express-session';

import userRoute from './user/user';
import goalRoute from './goal/goal';
import habitRoute from './habit/habit';
import journalRoute from './journal/journal';
import taskRoute from './task/task';
import reminderRoute from './reminder/reminder';

const app = express();
const PORT = 3030;

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  next();
});

app.use(userRoute);
app.use(goalRoute);
app.use(habitRoute);
app.use(journalRoute);
app.use(taskRoute);
app.use(reminderRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
