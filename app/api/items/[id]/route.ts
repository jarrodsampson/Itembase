import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return getItem(params.id);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return deleteItem(params.id);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  return updateItem(req, params.id);
}

const getItem = async (id: string) => {
  try {
    const userSearch = await prisma.item.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (userSearch) {
      return NextResponse.json({ userSearch }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
  } catch (e: unknown) {
    return NextResponse.json(
      {
        error: "An error occurred while processing your request",
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
};

const deleteItem = async (id: string) => {
  try {
    const userDelete = await prisma.item.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (userDelete) {
      return NextResponse.json({ message: "Item successfully deleted" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
  } catch (e: unknown) {
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

const updateItem = async (req: Request, id: string) => {
  try {
    const { name, message } = await req.json();

    if (!name) {
      NextResponse.json({ error: "Invalid request: Missing item name" }, { status: 400 });
      return;
    }

    const itemId = id as string;

    const userUpdate = await prisma.item.update({
      where: {
        id: parseInt(itemId, 10),
      },
      data: {
        name,
        message,
      },
    });

    if (userUpdate) {
      return NextResponse.json({ userUpdate }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
  } catch (e: unknown) {
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
