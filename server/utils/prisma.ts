import { PrismaClient } from '@prisma/client';

export class PrismaInstance {
  private prisma: PrismaClient | null;

  constructor() {
    this.prisma = null;
  }

  createInstance = () => {
    if (!this.prisma) {
      this.prisma = new PrismaClient();
    }
  };

  getInstance = () => {
    if (!this.prisma) {
      throw new Error('No instance was made!');
    }
    return this.prisma;
  };
}
