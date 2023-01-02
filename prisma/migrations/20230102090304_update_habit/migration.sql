-- CreateTable
CREATE TABLE "UpdateHabit" (
    "habit_id" TEXT NOT NULL PRIMARY KEY,
    "uid" TEXT NOT NULL,
    "name" TEXT,
    "frequency_per_week" REAL,
    "description" TEXT,
    "start_date" DATETIME,
    "end_date" DATETIME,
    "status" INTEGER
);
