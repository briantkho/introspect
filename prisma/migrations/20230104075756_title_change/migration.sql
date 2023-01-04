/*
  Warnings:

  - You are about to drop the column `name` on the `Habit` table. All the data in the column will be lost.
  - Added the required column `title` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habit" (
    "habit_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "frequency_per_week" REAL,
    "description" TEXT,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME,
    "status" INTEGER NOT NULL,
    CONSTRAINT "Habit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Habit" ("description", "end_date", "frequency_per_week", "habit_id", "start_date", "status", "user_id") SELECT "description", "end_date", "frequency_per_week", "habit_id", "start_date", "status", "user_id" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
