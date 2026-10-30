// Contact form forwarder. The page posts here, and this route posts to PlayGTM.
// Previous endpoint: https://formcarry.com/s/hTf-YiYRND_
const INBOUND_URL =
  "https://app.playgtm.ai/api/webhooks/inbound?projectId=cmo7qlw1f000iov0z1rutu26r&key=iwh_EHx1EdmukSxw_oAv0taH1BZX1sk_9SVk";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const upstream = await fetch(INBOUND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return Response.json({ ok: false, error: "Upstream unreachable" }, { status: 502 });
  }
}
