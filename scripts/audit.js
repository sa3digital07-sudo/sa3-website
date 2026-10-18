import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

console.log('🔍 [Audit] Starting SA³ Web Quality, SEO & Accessibility Audit...\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

const EXPECTED_ROUTES = [
  { file: 'index.html', path: '/' },
  { file: 'services/index.html', path: '/services/' },
  { file: 'website-development/index.html', path: '/website-development/' },
  { file: 'custom-software/index.html', path: '/custom-software/' },
  { file: 'application-development/index.html', path: '/application-development/' },
  { file: 'about/index.html', path: '/about/' },
  { file: 'contact/index.html', path: '/contact/' },
  { file: '404.html', path: '/404.html' }
];

// 1. Verify all routes exist
console.log('--- 1. Route Generation & Crawlable HTML Files ---');
for (const route of EXPECTED_ROUTES) {
  const filePath = path.join(distDir, route.file);
  assert(fs.existsSync(filePath), `Route file exists: ${route.file}`);
}

// 2. Audit SEO Metadata for each page
console.log('\n--- 2. SEO Metadata, Titles & Descriptions ---');
const titlesSeen = new Set();
const descriptionsSeen = new Set();

for (const route of EXPECTED_ROUTES) {
  const filePath = path.join(distDir, route.file);
  if (!fs.existsSync(filePath)) continue;

  const content = fs.readFileSync(filePath, 'utf8');

  // Title check
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  assert(!!titleMatch && titleMatch[1].trim().length > 15, `${route.file}: Valid title ("${titleMatch?.[1]}")`);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    assert(!titlesSeen.has(title), `${route.file}: Unique page title`);
    titlesSeen.add(title);
  }

  // Meta description check
  const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
  assert(!!descMatch && descMatch[1].trim().length > 40, `${route.file}: Valid meta description (${descMatch?.[1]?.length} chars)`);
  if (descMatch) {
    const desc = descMatch[1].trim();
    assert(!descriptionsSeen.has(desc), `${route.file}: Unique meta description`);
    descriptionsSeen.add(desc);
  }

  // Canonical tag check
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);
  assert(!!canonicalMatch && canonicalMatch[1].startsWith('https://sa3.digital'), `${route.file}: Canonical URL defined`);

  // OpenGraph check
  const ogTitle = content.match(/<meta\s+property="og:title"\s+content="(.*?)"/i);
  const ogDesc = content.match(/<meta\s+property="og:description"\s+content="(.*?)"/i);
  assert(!!ogTitle && !!ogDesc, `${route.file}: OpenGraph title & description configured`);

  // Heading check
  const h1Matches = content.match(/<h1[^>]*>.*?<\/h1>/gi);
  assert(h1Matches && h1Matches.length === 1, `${route.file}: Exactly one <h1> tag present`);

  // Semantic landmarks check
  assert(content.includes('<main'), `${route.file}: Semantic <main> landmark present`);
  assert(content.includes('<header'), `${route.file}: Semantic <header> landmark present`);
  assert(content.includes('<footer'), `${route.file}: Semantic <footer> landmark present`);
  assert(content.includes('<nav'), `${route.file}: Semantic <nav> landmark present`);

  // HTML accessibility: skip to content
  assert(content.includes('skip-to-content'), `${route.file}: Accessible skip link present`);
}

// 3. Technical SEO: robots.txt and sitemap.xml
console.log('\n--- 3. Technical SEO Assets ---');
const robotsPath = path.join(distDir, 'robots.txt');
assert(fs.existsSync(robotsPath), 'robots.txt exists in build output');
if (fs.existsSync(robotsPath)) {
  const robotsTxt = fs.readFileSync(robotsPath, 'utf8');
  assert(robotsTxt.includes('User-agent: *'), 'robots.txt specifies User-agent: *');
  assert(robotsTxt.includes('Sitemap:'), 'robots.txt references sitemap.xml');
}

const sitemapPath = path.join(distDir, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'sitemap.xml exists in build output');
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  assert(sitemapXml.includes('<urlset'), 'sitemap.xml has valid XML schema');
  for (const route of EXPECTED_ROUTES) {
    if (route.file === '404.html') continue; // 404 should never be in sitemap
    assert(sitemapXml.includes(`https://sa3.digital${route.path}`), `sitemap.xml includes ${route.path}`);
  }
}

// 4. Brand assets
console.log('\n--- 4. Brand & Favicon Assets ---');
const logoPath = path.join(distDir, 'images/logo.png');
const faviconPath = path.join(distDir, 'images/favicon.png');
assert(fs.existsSync(logoPath), 'Brand logo.png preserved and present in dist/images');
assert(fs.existsSync(faviconPath), 'Favicon.png preserved and present in dist/images');

// 5. Audit Results Summary
console.log('\n=============================================');
console.log(`Audit Finished: ${passCount} PASSED, ${failCount} FAILED`);
console.log('=============================================\n');

if (failCount > 0) {
  process.exit(1);
}
