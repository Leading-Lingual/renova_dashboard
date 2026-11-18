export function getClientRequestHeaders(request: Request) {
  const userAgent = request.headers.get("user-agent");
  return {
    ...(userAgent ? { "X-Client-User-Agent": userAgent } : {}),
  };
}
