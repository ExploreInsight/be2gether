const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    credentials: BASE ? "omit" : "same-origin",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    let message = res.status === 401 ? "Sign in to do that." : "Something went wrong.";
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {}
    throw new ApiError(message, res.status);
  }
  return (await res.json()) as T;
}

export const post = <T>(path: string, body?: unknown) =>
  api<T>(path, { method: "POST", body: body === undefined ? undefined : JSON.stringify(body) });
export const patch = <T>(path: string, body: unknown) =>
  api<T>(path, { method: "PATCH", body: JSON.stringify(body) });
export const del = <T>(path: string) => api<T>(path, { method: "DELETE" });
