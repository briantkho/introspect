-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habit" (
    "habit_id" TEXT NOT NULL PRIMARY KEY,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "frequency_per_week" REAL NOT NULL,
    "description" TEXT,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT,
    "status" INTEGER NOT NULL,
    CONSTRAINT "Habit_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Habit" ("description", "end_date", "frequency_per_week", "habit_id", "name", "start_date", "status", "uid") SELECT "description", "end_date", "frequency_per_week", "habit_id", "name", "start_date", "status", "uid" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
