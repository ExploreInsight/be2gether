import { NextResponse } from "next/server";

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const json = <T>(data: T, status = 200) => NextResponse.json(data, { status });

/** Wraps a route handler so thrown HttpErrors become JSON errors. */
export function route<A extends unknown[]>(fn: (...args: A) => Promise<Response>) {
  return async (...args: A): Promise<Response> => {
    try {
      return await fn(...args);
    } catch (e) {
      if (e instanceof HttpError) return json({ error: e.message }, e.status);
      console.error("API error", e);
      return json({ error: "Something went wrong on our side." }, 500);
    }
  };
}

export async function readJson<T>(req: Request): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch {
    throw new HttpError(400, "Request body must be JSON.");
  }
}

export function cursorOf(req: Request): string | null {
  return new URL(req.url).searchParams.get("cursor");
}
