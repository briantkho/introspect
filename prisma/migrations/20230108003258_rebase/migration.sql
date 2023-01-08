/*
  Warnings:

  - Added the required column `priority` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Goal" (
    "goal_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" INTEGER NOT NULL,
    CONSTRAINT "Goal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Journal" (
    "journal_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "goal_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Journal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Journal_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "Goal" ("goal_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Journal" ("date", "description", "journal_id", "title", "user_id") SELECT "date", "description", "journal_id", "title", "user_id" FROM "Journal";
DROP TABLE "Journal";
ALTER TABLE "new_Journal" RENAME TO "Journal";
CREATE TABLE "new_Habit" (
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
INSERT INTO "new_Habit" ("description", "end_date", "frequency_per_week", "habit_id", "start_date", "status", "title", "user_id") SELECT "description", "end_date", "frequency_per_week", "habit_id", "start_date", "status", "title", "user_id" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
CREATE TABLE "new_Task" (
    "task_id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL,
    "priority" INTEGER NOT NULL,
    "date" DATETIME,
    CONSTRAINT "Task_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "Habit" ("habit_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("date", "description", "habit_id", "status", "task_id", "title") SELECT "date", "description", "habit_id", "status", "task_id", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
