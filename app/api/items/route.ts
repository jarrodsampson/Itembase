import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createRedisInstance } from "../../../redis";

const prisma = new PrismaClient();

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

export async function GET(req: NextRequest) {
  return searchItems(req);
}

export async function POST(req: NextRequest) {
  return createItem(req);
}

export async function DELETE(req: NextRequest) {
  return deleteItems(req);
}

export async function PATCH(req: NextRequest) {
  return updateItems(req);
}

const searchItems = async (req: NextRequest) => {
  const limit = req.nextUrl.searchParams.get("limit");
  const offset = req.nextUrl.searchParams.get("offset");
  const search = req.nextUrl.searchParams.get("search");

  // get redis instance ready
  const redis = createRedisInstance();

  // try fetch cached data
  const key = `request-${limit}-${offset}-${search}`;
  const cached = await redis.get(key);
  // if cached, we're good!
  if (cached) {
    return NextResponse.json(JSON.parse(cached), {
      status: 200,
    });
  }

  try {
    let items = [];
    let total: Number = 0;
    let where = {
      name: {
        contains: `${search}`,
      },
    };
    items = await prisma.item.findMany({
      skip: Number(offset) || DEFAULT_OFFSET,
      take: Number(limit) || DEFAULT_LIMIT,
      where,
    });
    total = await prisma.item.count({
      where: where,
    });
    if (search) {
    } else {
      items = await prisma.item.findMany({
        skip: Number(offset) || DEFAULT_OFFSET,
        take: Number(limit) || DEFAULT_LIMIT,
      });
      total = await prisma.item.count();
    }

    let payload = { items, total };

    // if not in let's cache this data
    const MAX_AGE = 15 * 1000; // every 15 seconds
    const EXPIRY_MS = "PX"; // milliseconds

    // cache data
    await redis.set(key, JSON.stringify(payload), EXPIRY_MS, MAX_AGE);

    return NextResponse.json(payload, {
      status: 200,
    });
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

const createItem = async (req: NextRequest) => {
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
          return NextResponse.json({ error: "Duplicate Item detected" }, { status: 400 });
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
    return NextResponse.json({ error: "Invalid request: Missing item name" }, { status: 400 });
  }
};

const deleteItems = async (req: NextRequest) => {
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
      return NextResponse.json({ message: "Items Successfully Deleted." }, { status: 200 });
    } else {
      return NextResponse.json({ error: "No items found to delete" }, { status: 404 });
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

const updateItems = async (req: NextRequest) => {
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
      return NextResponse.json({ message: "Items Successfully Updated." }, { status: 200 });
    } else {
      return NextResponse.json({ error: "No items found to update" }, { status: 404 });
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
