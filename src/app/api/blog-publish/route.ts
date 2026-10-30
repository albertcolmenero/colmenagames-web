// Idempotency: content-addressed. See src/lib/blog-publish.mjs.
// The handler compares the serialized Markdown to the file on main and skips
// the commit when the bytes match. The HTTP response waits for that GitHub
// write, because the platform treats the JSON action as the result and uses
// 502 as the retry signal.

import handler from "@/lib/blog-publish.mjs";

type NodeRes = {
  statusCode: number;
  headers: Record<string, string>;
  body: unknown;
  status(code: number): NodeRes;
  setHeader(key: string, value: string): void;
  json(payload: unknown): NodeRes;
};

function createRes(): NodeRes {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(key, value) {
      this.headers[key] = value;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

async function callHandler(request: Request) {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  let body: string | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    body = await request.text();
  }

  const res = createRes();
  await handler({ method: request.method, headers, body }, res);

  return new Response(JSON.stringify(res.body), {
    status: res.statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...res.headers,
    },
  });
}

export const GET = callHandler;
export const POST = callHandler;
export const PUT = callHandler;
export const PATCH = callHandler;
export const DELETE = callHandler;
export const OPTIONS = callHandler;
export const HEAD = callHandler;
