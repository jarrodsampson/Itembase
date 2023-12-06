import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const opts = {
  points: 6,
  duration: 1, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

export default async function middleware() {
  let res: any;
  try {
    res = await rateLimiter.consume(2);
  } catch (error) {
    res = error;
  }

  if (res._remainingPoints > 0) {
    return NextResponse.next();
  } else {
    return NextResponse.json(
      {
        error: "Rate limit exceeded. Please try again later.",
      },
      {
        status: 429,
      }
    );
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
