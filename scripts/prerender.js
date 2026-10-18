import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const ROUTES = [
  {
    path: '/',
    outFile: 'dist/index.html',
    title: 'SA³ — From Ideas to Reality | Digital Product & Software Studio',
    description: 'SA³ designs and builds purposeful websites, custom software, and responsive digital experiences engineered for clarity, speed, and real-world utility.',
    canonical: 'https://sa3.digital/',
    type: 'website'
  },
  {
    path: '/services/',
    outFile: 'dist/services/index.html',
    title: 'Services & Capabilities | SA³ Studio',
    description: 'Explore SA³ services: bespoke website design & development, workflow-tailored custom software, and user-centric application development.',
    canonical: 'https://sa3.digital/services/',
    type: 'website'
  },
  {
    path: '/website-development/',
    outFile: 'dist/website-development/index.html',
    title: 'Website Design & Development | SA³ Studio',
    description: 'Plan, design, and build fast, responsive websites that communicate clearly, build institutional trust, and generate qualified enquiries.',
    canonical: 'https://sa3.digital/website-development/',
    type: 'article'
  },
  {
    path: '/custom-software/',
    outFile: 'dist/custom-software/index.html',
    title: 'Custom Software Development | SA³ Studio',
    description: 'Convert manual or fragmented workflows into reliable, purpose-built internal tools, portals, and operational software systems.',
    canonical: 'https://sa3.digital/custom-software/',
    type: 'article'
  },
  {
    path: '/application-development/',
    outFile: 'dist/application-development/index.html',
    title: 'Application Development | SA³ Studio',
    description: 'Build web and cross-platform applications centered around verified user needs, predictable state, and intuitive interface design.',
    canonical: 'https://sa3.digital/application-development/',
    type: 'article'
  },
  {
    path: '/about/',
    outFile: 'dist/about/index.html',
    title: 'About SA³ | Purposeful Engineering & Design Principles',
    description: 'Learn about SA³: an independent studio focused on purposeful websites, custom software, and modern digital engineering without unnecessary complexity.',
    canonical: 'https://sa3.digital/about/',
    type: 'website'
  },
  {
    path: '/contact/',
    outFile: 'dist/contact/index.html',
    title: 'Discuss Your Project | Contact SA³',
    description: 'Reach out to SA³ to discuss a website, custom software system, or application project. Direct conversations with engineering leads.',
    canonical: 'https://sa3.digital/contact/',
    type: 'website'
  },
  {
    path: '/404.html',
    outFile: 'dist/404.html',
    title: 'Page Not Found | SA³ Studio',
    description: 'The requested page could not be located. Explore SA³ digital services and core engineering capabilities.',
    canonical: 'https://sa3.digital/404.html',
    type: 'website'
  }
];

async function prerender() {
  console.log('⚡ [Prerender] Starting static HTML generation for all routes...');
  
  const templatePath = path.resolve(projectRoot, 'dist/index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html does not exist. Run vite build first.');
  }

  const ssrBundlePath = path.resolve(projectRoot, 'dist-ssr/entry-server.js');
  if (!fs.existsSync(ssrBundlePath)) {
    throw new Error('dist-ssr/entry-server.js does not exist.');
  }

  const { render } = await import(`file://${ssrBundlePath}`);
  const baseTemplate = fs.readFileSync(templatePath, 'utf8');

  for (const route of ROUTES) {
    const renderedAppHtml = render(route.path);

    let html = baseTemplate;

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

    // Replace or Inject Description
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${route.description}">`
    );

    // Replace or Inject Canonical Link
    html = html.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${route.canonical}">`
    );

    // Replace OpenGraph Title & Description
    html = html.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${route.title}">`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${route.description}">`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${route.canonical}">`
    );

    // Inject App Markup into Root
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${renderedAppHtml}</div>`
    );

    const outPath = path.resolve(projectRoot, route.outFile);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf8');

    console.log(`  ✓ Generated indexable: ${route.outFile} (${route.path})`);
  }

  // Clean up SSR temp directory
  fs.rmSync(path.resolve(projectRoot, 'dist-ssr'), { recursive: true, force: true });
  console.log('✨ [Prerender] Complete! All indexable HTML routes successfully generated.');
}

prerender().catch(err => {
  console.error('❌ [Prerender Error]:', err);
  process.exit(1);
});
