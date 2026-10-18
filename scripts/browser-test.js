import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const screenshotsDir = path.resolve(__dirname, '../tests-output');

fs.mkdirSync(screenshotsDir, { recursive: true });

// Chrome executable discovery
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
];

let executablePath = CHROME_PATHS.find(p => fs.existsSync(p));
if (!executablePath) {
  console.error('❌ No Chrome or Edge executable found.');
  process.exit(1);
}

// 1. Lightweight Static File Server for Dist
function createServer(port) {
  const mimeTypes = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.txt': 'text/plain'
  };

  const server = http.createServer((req, res) => {
    let cleanUrl = req.url.split('?')[0];
    if (cleanUrl.endsWith('/')) {
      cleanUrl += 'index.html';
    }

    let filePath = path.join(distDir, cleanUrl);

    // If file doesn't exist, try adding /index.html or .html or 404.html
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      if (fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      } else if (fs.existsSync(`${filePath}.html`)) {
        filePath = `${filePath}.html`;
      } else {
        filePath = path.join(distDir, '404.html');
        res.statusCode = 404;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(res.statusCode || 200, { 'Content-Type': contentType });
      res.end(data);
    } catch {
      res.writeHead(500);
      res.end('Server Error');
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve(server);
    });
  });
}

async function runBrowserTests() {
  const PORT = 4188;
  const server = await createServer(PORT);
  const baseUrl = `http://localhost:${PORT}`;

  console.log(`🌐 [Browser Testing] Local server running at ${baseUrl}`);
  console.log(`🚀 [Browser Testing] Launching browser: ${executablePath}\n`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

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

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.toString());
    });

    // TEST 1: Homepage Live Render
    console.log('--- TEST 1: Homepage Rendering & 3D Centerpiece ---');
    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle0' });

    const title = await page.title();
    assert(title.includes('SA³ — From Ideas to Reality'), `Page title is correct: "${title}"`);

    const h1Text = await page.$eval('h1', el => el.textContent.trim());
    assert(h1Text === 'Ideas deserve to become real.', `H1 is exact: "${h1Text}"`);

    // Verify 3D Centerpiece exists in DOM
    const has3DWrapper = await page.$('.hero-3d-wrapper');
    assert(!!has3DWrapper, 'Hero 3D centerpiece wrapper is rendered in DOM');

    const hasGlassPrism = await page.$('.glass-prism');
    assert(!!hasGlassPrism, '3D Glass Prism sculpture is rendered');

    const hasOrbitalRing = await page.$('.orbital-ring');
    assert(!!hasOrbitalRing, '3D Orbital geometry ring is rendered');

    // Capture hero desktop screenshot before any interaction/scrolling
    await page.screenshot({ path: path.join(screenshotsDir, '00-hero-desktop-1440.png'), fullPage: false });
    console.log('  📸 Captured: 00-hero-desktop-1440.png');

    // Simulate mouse movement on 3D centerpiece
    await page.mouse.move(720, 300);
    await page.evaluate(() => new Promise(r => setTimeout(r, 200)));
    await page.mouse.move(800, 350);

    // Verify Services section on Home
    const serviceCardsCount = await page.$$eval('.service-card', els => els.length);
    assert(serviceCardsCount === 3, `Home renders 3 core service cards (Found: ${serviceCardsCount})`);

    // Verify Concept Showcase
    const conceptCardsCount = await page.$$eval('.concept-card', els => els.length);
    assert(conceptCardsCount === 3, `Home renders 3 original concept explorations (Found: ${conceptCardsCount})`);

    // Verify Process Section
    const processStepsCount = await page.$$eval('.process-card', els => els.length);
    assert(processStepsCount === 4, `Home renders 4 disciplined process steps (Found: ${processStepsCount})`);

    // Verify FAQ Accordion Interactive Expand/Collapse
    console.log('\n--- TEST 2: FAQ Accordion Interaction ---');
    const firstFaqTrigger = await page.$('.faq-trigger');
    const firstFaqAnswerBefore = await page.$('.faq-answer-inner');
    assert(!!firstFaqAnswerBefore, 'First FAQ item is open by default');

    // Click to collapse
    await firstFaqTrigger.click();
    await page.evaluate(() => new Promise(r => setTimeout(r, 350)));
    const firstFaqAnswerAfter = await page.$('.faq-answer-inner');
    assert(!firstFaqAnswerAfter, 'First FAQ item collapsed on click');

    // Click again to expand
    await firstFaqTrigger.click();
    await page.evaluate(() => new Promise(r => setTimeout(r, 350)));
    const firstFaqAnswerReopened = await page.$('.faq-answer-inner');
    assert(!!firstFaqAnswerReopened, 'First FAQ item re-expanded on second click');

    // Capture desktop homepage screenshot
    await page.screenshot({ path: path.join(screenshotsDir, '01-home-desktop-1440.png'), fullPage: false });
    console.log('  📸 Captured: 01-home-desktop-1440.png');

    // TEST 3: Navigation across all routes
    console.log('\n--- TEST 3: Route Direct Visits & Content Validation ---');
    const testRoutes = [
      { url: '/services/', expectedHeading: 'Purpose-Built Digital Services' },
      { url: '/website-development/', expectedHeading: 'Website Design & Development' },
      { url: '/custom-software/', expectedHeading: 'Custom Software Development' },
      { url: '/application-development/', expectedHeading: 'Application Development' },
      { url: '/about/', expectedHeading: 'About SA³' },
      { url: '/contact/', expectedHeading: 'Discuss Your Project' },
      { url: '/404.html', expectedHeading: 'Page Not Found' }
    ];

    for (const r of testRoutes) {
      await page.goto(`${baseUrl}${r.url}`, { waitUntil: 'networkidle0' });
      const heading = await page.$eval('h1', el => el.textContent.trim());
      assert(heading.includes(r.expectedHeading), `Route ${r.url} renders expected heading: "${heading}"`);
    }

    // TEST 4: Contact & Connect Glassmorphism Card Validation & Link Verification
    console.log('\n--- TEST 4: Contact & Connect Card & Action Links Verification ---');
    await page.goto(`${baseUrl}/contact/`, { waitUntil: 'networkidle0' });

    // Verify single cohesive large glassmorphic card exists
    const connectCard = await page.$('.contact-connect-card');
    assert(!!connectCard, 'Single cohesive Contact & Connect card (.contact-connect-card) is rendered');

    // Verify Header
    const eyebrowText = await page.$eval('.connect-eyebrow-pill span', el => el.textContent.trim());
    assert(eyebrowText === "LET'S CONNECT", `Card Eyebrow is exact: "${eyebrowText}"`);

    const headingText = await page.$eval('.connect-main-heading', el => el.textContent.trim());
    assert(headingText === 'One team. Two founders. One vision.', `Card Heading is exact: "${headingText}"`);

    const supportingText = await page.$eval('.connect-supporting-text', el => el.textContent.trim());
    assert(supportingText === 'Have an idea? Reach the people behind SA³ directly.', `Card Supporting Text is exact: "${supportingText}"`);

    // Verify both founder entries render inside the main card
    const founderCardsCount = await page.$$eval('.founder-inner-card', els => els.length);
    assert(founderCardsCount === 2, `Contact card renders exactly 2 founder entries inside (Found: ${founderCardsCount})`);

    // Verify Founder 1: Aryan Phutane
    const aryanName = await page.$eval('.founder-inner-card:nth-child(1) .founder-fullname', el => el.textContent.trim());
    assert(aryanName === 'Aryan Phutane', `Founder 1 name is exact: "${aryanName}"`);
    
    const aryanCallLink = await page.$eval('.founder-inner-card:nth-child(1) .btn-call', el => el.getAttribute('href'));
    assert(aryanCallLink === 'tel:+919834006980', `Founder 1 Call link is valid tel: protocol (${aryanCallLink})`);

    const aryanWaLink = await page.$eval('.founder-inner-card:nth-child(1) .btn-whatsapp', el => el.getAttribute('href'));
    assert(aryanWaLink.startsWith('https://wa.me/919834006980'), `Founder 1 WhatsApp link uses wa.me/ with international digits (${aryanWaLink})`);

    // Verify Founder 2: Sarthak Mahajan
    const sarthakName = await page.$eval('.founder-inner-card:nth-child(2) .founder-fullname', el => el.textContent.trim());
    assert(sarthakName === 'Sarthak Mahajan', `Founder 2 name is exact: "${sarthakName}"`);

    const sarthakCallLink = await page.$eval('.founder-inner-card:nth-child(2) .btn-call', el => el.getAttribute('href'));
    assert(sarthakCallLink === 'tel:+917020712701', `Founder 2 Call link is valid tel: protocol (${sarthakCallLink})`);

    const sarthakWaLink = await page.$eval('.founder-inner-card:nth-child(2) .btn-whatsapp', el => el.getAttribute('href'));
    assert(sarthakWaLink.startsWith('https://wa.me/917020712701'), `Founder 2 WhatsApp link uses wa.me/ with international digits (${sarthakWaLink})`);

    // Verify Visual Divider between founders and company channels
    const divider = await page.$('.connect-card-divider');
    assert(!!divider, 'Clear visual divider (.connect-card-divider) separates founders from company channels');

    // Verify Company Channels (LinkedIn and Instagram)
    const channelLinks = await page.$$eval('.channel-tile', els => els.map(el => el.getAttribute('href')));
    assert(channelLinks.includes('https://www.linkedin.com/company/sa3-digital/'), 'Verified LinkedIn channel link rendered');
    assert(channelLinks.includes('https://www.instagram.com/sa3digital'), 'Verified Instagram channel link rendered');

    // Non-functional safety check: Ensure unverified email link is NOT rendered as an active or broken button
    const hasUnverifiedEmailLink = channelLinks.some(href => href && href.includes('sa3digital07@gmail.com'));
    assert(!hasUnverifiedEmailLink, 'Unverified email link correctly withheld from public rendering');

    // Verify external link indicators exist on channel cards
    const externalArrowsCount = await page.$$eval('.channel-tile-arrow', els => els.length);
    assert(externalArrowsCount === 2, `Both verified channel cards have external-link indicators (Found: ${externalArrowsCount})`);

    // Test copy button interaction
    const copyBtn = await page.$('.founder-inline-copy');
    assert(!!copyBtn, 'Quick-copy button is available for direct founder phone number');

    await page.screenshot({ path: path.join(screenshotsDir, '02-contact-connect-card.png'), fullPage: true });
    console.log('  📸 Captured: 02-contact-connect-card.png (fullPage: true)');

    // TEST 5: Responsive Viewports (360px, 390px, 768px, 1024px, 1440px)
    console.log('\n--- TEST 5: Responsive Viewport Checks (No Horizontal Overflow) ---');
    const viewports = [
      { width: 360, height: 740, name: '360px (Small Mobile)' },
      { width: 390, height: 844, name: '390px (iPhone 14/15)' },
      { width: 768, height: 1024, name: '768px (Tablet Portrait)' },
      { width: 1024, height: 768, name: '1024px (Tablet Landscape)' },
      { width: 1440, height: 900, name: '1440px (Desktop)' }
    ];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle0' });

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      assert(!hasHorizontalScroll, `${vp.name}: No horizontal overflow detected (scrollWidth <= ${vp.width})`);

      if (vp.width === 390) {
        // Test mobile hamburger menu
        const mobileToggle = await page.$('.mobile-toggle');
        assert(!!mobileToggle, 'Mobile menu button is visible on 390px');
        await mobileToggle.click();
        await page.waitForSelector('.mobile-drawer', { timeout: 2000 });
        await page.evaluate(() => new Promise(r => setTimeout(r, 350))); // Wait for animation to settle
        const drawerLinksCount = await page.$$eval('.mobile-nav-link', els => els.length);
        assert(drawerLinksCount >= 6, `Mobile drawer opened with navigation links (${drawerLinksCount} links)`);
        await page.screenshot({ path: path.join(screenshotsDir, '03-home-mobile-390.png'), fullPage: false });
        console.log('  📸 Captured: 03-home-mobile-390.png');
      }
    }

    // TEST 6: Console Errors Audit
    console.log('\n--- TEST 6: Console Error & Network Fault Audit ---');
    assert(consoleErrors.length === 0, `Zero console errors or unhandled exceptions (Found: ${consoleErrors.length})`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach(err => console.error('    Log error:', err));
    }

  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n=============================================');
  console.log(`Browser Tests Finished: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('=============================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runBrowserTests().catch(err => {
  console.error('❌ [Browser Test Failed]:', err);
  process.exit(1);
});
