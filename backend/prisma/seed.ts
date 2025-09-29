import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const passwordHash = await bcrypt.hash('secret123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', name: 'Admin', password: passwordHash },
  });

  const roomA = await prisma.room.upsert({
    where: { name: 'Sala 101' },
    update: {},
    create: { name: 'Sala 101', capacity: 30 },
  });

  console.log('Seeded:', { user, roomA });
}

main().finally(async () => prisma.$disconnect());
