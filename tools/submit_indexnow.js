const host = 'sunvoltglobal.com';
const key = '3f9c7b2e84a14d6fa5c8e0b71d2f4936';
const keyLocation = `https://${host}/${key}.txt`;

async function main() {
  const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  if (!urls.length) {
    throw new Error('No URLs found in sitemap.xml');
  }

  const payload = { host, key, keyLocation, urlList: urls };
  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  console.log(`Submitting ${urls.length} URLs`);

  for (const endpoint of endpoints) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const body = await response.text();
    console.log(`${endpoint} status=${response.status}${body ? ` ${body.slice(0, 200)}` : ''}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
