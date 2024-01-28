import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient();

const createAdmin = async () => {
  const rounds = process.env.SALT as string;

  const salt = await bcrypt.genSalt(Number(rounds));

  let password = process.env.ADMINPASSWORD as string;

  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await prisma.apiAdmin.create({
    data: {
      login: process.env.ADMINLOGIN as string,
      password: hashedPassword,
    },
  });

  await prisma.olxCredetnials.create({
    data: {
      adminId: admin.id,
      olxRefreshToken: '',
      expires_in: '',
      olxToken: '',
    },
  });
};

createAdmin()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('true');
    await prisma.$disconnect();
  });
