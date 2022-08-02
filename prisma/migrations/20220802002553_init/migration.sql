-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Habit" (
    "habit_id" TEXT NOT NULL PRIMARY KEY,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "frequency_per_week" REAL NOT NULL,
    "description" TEXT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME,
    "status" INTEGER NOT NULL,
    CONSTRAINT "Habit_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reminder" (
    "reminder_id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "reminder_time" DATETIME NOT NULL,
    "alert_time_mins" INTEGER NOT NULL,
    CONSTRAINT "Reminder_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "Habit" ("habit_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HabitReflection" (
    "hr_id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "HabitReflection_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "Habit" ("habit_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SelfReflection" (
    "sf_id" TEXT NOT NULL PRIMARY KEY,
    "hr_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "SelfReflection_hr_id_fkey" FOREIGN KEY ("hr_id") REFERENCES "HabitReflection" ("hr_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "task_id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "checked" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Task_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "Habit" ("habit_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
