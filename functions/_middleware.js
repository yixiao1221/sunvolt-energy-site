export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();

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
