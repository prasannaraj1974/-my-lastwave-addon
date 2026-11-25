export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/manifest.json" || url.pathname === "/") {
      return Response.json({ id: "com.prasannaraj.addon", name: "My Addon", version: "1.0.0" });
    }
    if (url.pathname === "/search") {
      return Response.json({ tracks: [{ id: "1", title: "Example Song", artist: "Example Artist", file: "https://cdn.example.com/audio/1.flac" }] });
    }
    return Response.json({ error: "Not found" }, { status: 404 });
  }
};
