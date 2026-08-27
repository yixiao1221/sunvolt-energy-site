export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();

  if (host === "sunvolt.aluferdoors.com") {
    const destination = new URL(url.pathname + url.search, "https://sunvoltglobal.com");
    return Response.redirect(destination.toString(), 301);
  }

  return context.next();
}
