import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit");
  const offset = req.nextUrl.searchParams.get("offset");
  const search = req.nextUrl.searchParams.get("search");

  try {
    let items = [];
    let total: Number = 0;
    let where = {
      name: {
        contains: `${search}`,
      },
    };
    items = await prisma.item.findMany({
      skip: Number(offset) || 0,
      take: Number(limit) || 10,
      where,
    });
    total = await prisma.item.count({
      where: where,
    });
    if (search) {
    } else {
      items = await prisma.item.findMany({
        skip: Number(offset) || 0,
        take: Number(limit) || 10,
      });
      total = await prisma.item.count();
    }

    return NextResponse.json(
      { items, total },
      {
        status: 200,
      }
    );
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
}

export async function POST(req: NextRequest) {
  const { name, message } = await req.json();
  if (name) {
    try {
      const user = await prisma.item.create({
        data: {
          name,
          message,
        },
      });
      return NextResponse.json({ item: user }, { status: 201 });
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (e.message.includes("Unique")) {
          return NextResponse.json(
            { error: "Duplicate Item detected" },
            { status: 400 }
          );
        } else {
          throw e;
        }
      } else {
        return NextResponse.json(
          { error: "An error occurred while processing your request" },
          { status: 500 }
        );
      }
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return NextResponse.json(
      { error: "Invalid request: Missing item name" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { itemIds } = await req.json();
    // check for validity first
    if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
      return NextResponse.json({ error: "Invalid item IDs" }, { status: 400 });
    }

    const deleteResult = await prisma.item.deleteMany({
      where: {
        id: {
          in: itemIds, // Filter by the list of item IDs
        },
      },
    });

    if (deleteResult.count > 0) {
      return NextResponse.json(
        { message: "Items Successfully Deleted." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "No items found to delete" },
        { status: 404 }
      );
    }
  } catch (e: unknown) {
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { itemIds, message } = await req.json();

    // Use Prisma to delete the items by their IDs
    const updateUsers = await prisma.item.updateMany({
      where: {
        id: {
          in: itemIds, // Filter by the list of item IDs
        },
      },
      data: {
        message,
      },
    });

    if (updateUsers.count > 0) {
      return NextResponse.json(
        { message: "Items Successfully Updated." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "No items found to update" },
        { status: 404 }
      );
    }
  } catch (e: unknown) {
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
