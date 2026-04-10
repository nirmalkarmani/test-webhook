export default {
  async fetch(request) {
    const url = new URL(request.url);

    const VERIFY_TOKEN = "my_test_token_123";

    if (request.method === "GET") {
      const mode = url.searchParams.get("hub.mode");
      const challenge = url.searchParams.get("hub.challenge");
      const token = url.searchParams.get("hub.verify_token");

      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
      } else {
        return new Response("Forbidden", { status: 403 });
      }
    }

    if (request.method === "POST") {
      const body = await request.json();
      console.log("Webhook received:", JSON.stringify(body));
      return new Response("OK", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  }
};
