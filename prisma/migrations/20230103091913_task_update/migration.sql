/*
  Warnings:

  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "task_id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "checked" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Task_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "Habit" ("habit_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("checked", "date", "habit_id", "task_id") SELECT "checked", "date", "habit_id", "task_id" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
