const catalog = [
  { id: '1', title: 'Example Song', artist: 'Example Artist', album: 'Example Album', duration: 215, file: 'https://cdn.example.com/audio/1.flac', sampleRate: 44100, bitDepth: 16 },
];
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
}
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === '/manifest.json' || path === '/') {
      return json({ id: 'com.prasannaraj.addon', name: 'My LastWave Addon', version: '1.0.0', resources: ['search', 'stream'] });
    }
    if (path === '/search') {
      const q = (url.searchParams.get('q') || '').toLowerCase();
      const tracks = catalog.filter((t) => q.includes(t.title.toLowerCase()) || q.includes(t.artist.toLowerCase())).map(({ file, sampleRate, bitDepth, ...track }) => ({ ...track, format: 'flac', audioQuality: 'LOSSLESS' }));
      return json({ tracks });
    }
    if (path.startsWith('/stream/')) {
      const id = path.replace('/stream/', '');
      const track = catalog.find((t) => t.id === id);
      if (!track) return json({ error: 'Unknown track.' }, 404);
      return json({ url: track.file, format: 'flac', codec: 'flac', container: 'flac', sampleRate: track.sampleRate, bitDepth: track.bitDepth, quality: 'Lossless', encrypted: false });
    }
    return json({ error: 'Not found' }, 404);
  }
};
