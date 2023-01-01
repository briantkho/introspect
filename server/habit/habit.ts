/**
 * Habit type
 */
export type HabitClass = {
  hid: string;
  uid: string;
  name: string;
  frequencyPerWeek: number;
  description: string;
  startDate: Date;
  endDate: Date;
  status: number;
};

/**
 * Habit reflection type
 */
export type HabitReflection = {
  hrid: string;
  hid: string;
  description: string;
};

type HabitParams = {
  name: string;
  frequencyPerWeek: number;
  description: string;
  startDate: Date;
  endDate: Date;
  status: number;
};

class Habit {
  hid: string;
  uid: string;
  name: string;
  frequencyPerWeek: number;
  description: string;
  startDate: Date;
  endDate: Date;
  status: boolean;

  constructor(
    name: string,
    frequencyPerWeek: number,
    description: string,
    startDate: Date,
    endDate: Date
  ) {
    this.hid = "Foo";
    this.uid = "User";
    this.name = name;
    this.frequencyPerWeek = frequencyPerWeek;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = true;
  }

  addHabit(
    name: string,
    frequencyPerWeek: number,
    description: string,
    startDate: Date,
    endDate: Date
  ): void {
    new Habit(name, frequencyPerWeek, description, startDate, endDate);
  }

  editName() {}

  editFrequency() {}

  editDescription() {}

  removeHabit() {}

  getHabit() {
    return this;
  }

  completeHabit() {
    if (!this.status) {
      this.status = false;
    } else {
      throw new Error("This habit has already been completed!");
    }
  }
}
