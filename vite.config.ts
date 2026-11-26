import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { content } from './src/content';

function robotsFile(site: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`;
}

function sitemapFile(site: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

function seoFilesPlugin(site: string): Plugin {
  return {
    name: 'aaiyeji-seo-files',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.url === '/robots.txt') {
          response.setHeader('Content-Type', 'text/plain; charset=utf-8');
          response.end(robotsFile(site));
          return;
        }
        if (request.url === '/sitemap.xml') {
          response.setHeader('Content-Type', 'application/xml; charset=utf-8');
          response.end(sitemapFile(site));
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsFile(site),
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemapFile(site),
      });
    },
  };
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

function invitationMeta(siteUrl: string) {
  const site = siteUrl.replace(/\/+$/, '');
  const ogImage = new URL(content.seo.ogImage, `${site}/`).toString();
  const location = {
    '@type': 'Place',
    name: content.venue.name.en,
    address: {
      '@type': 'PostalAddress',
      streetAddress: content.venue.name.en,
      addressLocality: 'Bhusawal',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  };

  const events = content.events.list.map((event) => ({
    '@type': 'Event',
    name: `${event.name.en} — ${content.couple.englishTitle}`,
    startDate: event.startISO,
    endDate: event.endISO,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    description: event.description.en,
    location,
    image: ogImage,
    organizer: {
      '@type': 'Organization',
      name: 'Aaiyeji',
      url: content.brand.url,
    },
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: content.seo.title,
        description: content.seo.description,
        url: site,
        inLanguage: ['mr-IN', 'en-IN'],
        primaryImageOfPage: ogImage,
      },
      ...events,
    ],
  };

  const tags = `
    <title>${escapeHtml(content.seo.title)}</title>
    <meta name="description" content="${escapeHtml(content.seo.description)}" />
    <meta name="keywords" content="${escapeHtml(content.seo.keywords)}" />
    <meta name="author" content="Aaiyeji" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${escapeHtml(site)}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Aaiyeji" />
    <meta property="og:title" content="${escapeHtml(content.seo.title)}" />
    <meta property="og:description" content="${escapeHtml(content.seo.description)}" />
    <meta property="og:url" content="${escapeHtml(site)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(content.seo.shareTitle)} ${escapeHtml(content.seo.shareDescription)}" />
    <meta property="og:locale" content="${content.seo.locale}" />
    <meta property="og:locale:alternate" content="${content.seo.localeAlternate}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(content.seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(content.seo.description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(content.seo.shareTitle)}" />

    <meta name="theme-color" content="${content.seo.themeColor}" />
    <meta name="application-name" content="Aaiyeji" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>`;

  return tags;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL || process.env.VITE_SITE_URL || content.siteUrl;

  return {
    plugins: [
      react(),
      {
        name: 'aaiyeji-invitation-meta',
        transformIndexHtml(html) {
          return html
            .replace('<!-- INVITATION_META -->', invitationMeta(siteUrl))
            .replaceAll('%SITE_URL%', escapeHtml(siteUrl.replace(/\/+$/, '')))
            .replaceAll('%THEME_COLOR%', content.seo.themeColor);
        },
      },
      seoFilesPlugin(siteUrl.replace(/\/+$/, '')),
    ],
    server: {
      host: true,
      port: 5173,
    },
    preview: {
      host: true,
      port: 4173,
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
    },
  };
});
