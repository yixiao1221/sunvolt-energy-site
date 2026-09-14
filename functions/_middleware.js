export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();

  // Internal operations docs live in the repo so a new machine can pick up the
  // work, but they must never be served publicly (they describe pricing
  // strategy, ad budgets and credentials workflow).
  const BLOCKED = [
    "/handoff.md",
    "/deploy.md",
    "/readme.md",
    "/agents.md",
    "/_seo_posts.md",
    "/_new_seo_posts.md",
  ];
  if (BLOCKED.includes(url.pathname.toLowerCase())) {
    return new Response("410 Gone", { status: 410 });
  }

  if (host === "sunvolt.aluferdoors.com" || host === "www.sunvoltglobal.com" || host === "sunvolt-energy.pages.dev") {
    const destination = new URL(url.pathname + url.search, "https://sunvoltglobal.com");
    return Response.redirect(destination.toString(), 301);
  }

  const response = await context.next();

  // Keep preview and project pages.dev URLs out of search indexes so only the
  // canonical production domain accumulates ranking signals.
  if (host === "sunvolt-energy.pages.dev" || host.endsWith(".sunvolt-energy.pages.dev")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}
