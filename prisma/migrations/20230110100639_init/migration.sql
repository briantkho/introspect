-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Goal" (
    "goal_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "target_date" DATETIME,
    "status" INTEGER NOT NULL,
    CONSTRAINT "Goal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Habit" (
    "habit_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "goal_id" TEXT,
    "title" TEXT NOT NULL,
    "frequency_per_week" REAL,
    "description" TEXT,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME,
    "status" INTEGER NOT NULL,
    CONSTRAINT "Habit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Habit_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "Goal" ("goal_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemReminder" (
    "item_reminder_id" TEXT NOT NULL PRIMARY KEY,
    "reminder_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    "task_id" TEXT,
    CONSTRAINT "ItemReminder_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "Habit" ("habit_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemReminder_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task" ("task_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reminder" (
    "reminder_id" TEXT NOT NULL PRIMARY KEY,
    "reminder_time" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HabitReflection" (
    "habit_reflection_id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "HabitReflection_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "Habit" ("habit_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Journal" (
    "journal_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "goal_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Journal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Journal_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "Goal" ("goal_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "task_id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL,
    "priority" INTEGER NOT NULL,
    "date" DATETIME,
    CONSTRAINT "Task_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "Habit" ("habit_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
