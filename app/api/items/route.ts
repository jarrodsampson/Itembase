import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET (
  req: NextRequest
) {

  return NextResponse.json({ message: 'Item successfully deleted' });
}
