# SEO Implementation Roadmap for CheckReactionTime.com

**Project:** Reaction Time Test Application  
**Site:** https://checkreactiontime.com  
**Start Date:** February 2026  
**Timeline:** 4-6 weeks

---

## 📊 Current State Assessment

### ✅ What's Already Working

- Sitemap generation configured
- Basic meta tags (title, description, OG tags)
- Canonical URLs
- Google Analytics (gtag.js)
- Partytown configured
- astro-og-canvas installed
- Sharp for image processing
- Structured data component exists
- Content collections for blogs
- Custom robots.txt

### ❌ Missing/Needs Improvement

- Google Fonts blocking render (imported in CSS)
- No RSS feed for blog
- No reading time for articles
- Missing resource hints (dns-prefetch, preconnect)
- No compression/minification
- Missing schema-dts type safety
- No external link configuration
- Google Analytics not moved to Partytown
- Missing breadcrumbs
- No web manifest optimization
- No performance monitoring
- Font files not preloaded

---

## 🎯 Implementation Plan

### **Phase 1: Quick Wins (Week 1)**

Priority: Performance & Critical SEO fixes

#### Step 1.1: Install Core Dependencies

```bash
npm install -D schema-dts reading-time
npm install @astrojs/rss rehype-external-links jsonld
npm install @playform/compress astro-font
```

**Why:**

- `schema-dts` - Type safety for structured data
- `jsonld` - Official JSON-LD processor for validation & manipulation
- `reading-time` - Blog UX improvement
- `@astrojs/rss` - Content discovery
- `rehype-external-links` - Security & SEO best practice
- `@playform/compress` - Performance boost
- `astro-font` - Fix font loading issues

#### Step 1.2: Fix Font Loading Performance

**File:** `src/styles/global.css`

**Current Issue:** Google Fonts loaded via CSS `@import` blocks rendering

**Action:** Remove CSS import and use astro-font

1. Create font configuration file:

```typescript
// src/config/fonts.ts
export const fontConfig = [
    {
        name: "Atkinson Hyperlegible",
        googleFontsURL:
            "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap",
        preload: true,
        display: "swap",
        fallback: "sans-serif",
    },
    {
        name: "JetBrains Mono",
        googleFontsURL:
            "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap",
        preload: true,
        display: "swap",
        fallback: "monospace",
    },
];
```

2. Update BaseLayout to use AstroFont:

```astro
---
// src/layouts/BaseLayout.astro
import { AstroFont } from 'astro-font';
import { fontConfig } from '../config/fonts';
---

<!DOCTYPE html>
<html>
<head>
  <AstroFont config={fontConfig} />
  <!-- rest of head -->
</head>
```

3. Remove from global.css:

```css
/* DELETE THIS LINE */
@import url("https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible...");
```

**Impact:** Reduces LCP by 0.5-1.5s

#### Step 1.3: Add Resource Hints

**File:** `src/layouts/BaseHead.astro`

Add after `<meta charset="utf-8" />`:

```astro
<!-- Resource Hints -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

**Impact:** Improves DNS resolution time for third-party resources

#### Step 1.4: Move Analytics to Partytown

**File:** `src/layouts/BaseHead.astro`

**Current:** Analytics runs on main thread  
**Fix:** Move to web worker

Replace current analytics script with:

```astro
<!-- Google Analytics via Partytown -->
<script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=G-8479THZJRY"></script>
<script type="text/partytown">
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-8479THZJRY");
</script>
```

**Impact:** Reduces main thread blocking by ~50ms

#### Step 1.5: Configure Compression

**File:** `astro.config.mjs`

Add compression integration:

```javascript
import compress from "@playform/compress";

export default defineConfig({
    // ... existing config
    integrations: [
        react(),
        mdx(),
        sitemap(),
        partytown({
            config: {
                forward: ["dataLayer.push"],
            },
        }),
        compress({
            CSS: true,
            HTML: {
                removeAttributeQuotes: false,
                removeComments: false, // Keep comments for debugging
            },
            Image: true,
            JavaScript: true,
            SVG: true,
        }),
    ],
});
```

**Impact:** Reduces bundle size by 20-40%

---

### **Phase 2: Type-Safe Schema & Content (Week 2)**

#### Step 2.1: Enhance Structured Data with Type Safety

**File:** `src/components/StructuredData.astro`

Current implementation is basic. Upgrade with schema-dts and jsonld:

```astro
---
import type { Thing, WithContext } from 'schema-dts';
import jsonld from 'jsonld';

interface Props {
  schema: WithContext<Thing>;
  validate?: boolean;
}

const { schema, validate = false } = Astro.props;

// Optionally validate in development
if (import.meta.env.DEV && validate) {
  try {
    await jsonld.compact(schema, schema['@context']);
    console.log('✓ Valid JSON-LD schema:', schema['@type']);
  } catch (error) {
    console.error('✗ Invalid JSON-LD schema:', error);
  }
}
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

#### Step 2.2: Create Schema Library

**File:** `src/lib/schema.ts` (NEW)

```typescript
import type {
    WithContext,
    WebSite,
    WebPage,
    Article,
    Organization,
    BreadcrumbList,
    WebApplication,
} from "schema-dts";
import jsonld from "jsonld";

const SITE_URL = "https://checkreactiontime.com";
const SITE_NAME = "Check Reaction Time";

/**
 * Validate JSON-LD schema in development
 * Uses jsonld library to ensure schema is valid before rendering
 */
export async function validateSchema(
    schema: WithContext<any>,
): Promise<boolean> {
    if (import.meta.env.PROD) return true;

    try {
        // Compact the schema to validate structure
        await jsonld.compact(schema, schema["@context"]);
        console.log("✓ Valid JSON-LD schema:", schema["@type"]);
        return true;
    } catch (error) {
        console.error("✗ Invalid JSON-LD schema:", error);
        return false;
    }
}

export const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [], // Add social media links
};

export const websiteSchema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
        "Test and improve your reaction speed with our precise reaction time tester",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
    },
};

export const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Reaction Time Test",
    description: "Online reaction time test tool",
    url: `${SITE_URL}/reaction-time-test`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
};

export async function getArticleSchema(
    title: string,
    description: string,
    url: string,
    publishDate: Date,
    modifiedDate?: Date,
): Promise<WithContext<Article>> {
    const schema: WithContext<Article> = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        url: url,
        datePublished: publishDate.toISOString(),
        dateModified: (modifiedDate || publishDate).toISOString(),
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
    };

    // Validate in development using jsonld
    await validateSchema(schema);

    return schema;
}

export async function getBreadcrumbSchema(
    items: Array<{ name: string; url: string }>,
): Promise<WithContext<BreadcrumbList>> {
    const schema: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    // Validate in development using jsonld
    await validateSchema(schema);

    return schema;
}
```

#### Step 2.3: Update Blog Collection Schema

**File:** `src/content.config.ts`

Add publishDate for RSS and schema:

```typescript
const blogs = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blogs" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pageTitle: z.string().optional(),
        publishDate: z
            .date()
            .optional()
            .default(() => new Date()), // ADD THIS
        updatedOn: z.date().optional(),
        draft: z.boolean().optional(),
    }),
});
```

#### Step 2.4: Create RSS Feed

**File:** `src/pages/rss.xml.ts` (NEW)

```typescript
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
    const blogs = await getCollection("blogs", ({ data }) => {
        return !data.draft;
    });

    return rss({
        title: "Check Reaction Time Blog",
        description:
            "Tips, guides, and insights about improving reaction time and gaming performance",
        site: context.site!,
        items: blogs.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publishDate || new Date(),
            description: post.data.description,
            link: `/blogs/${post.id}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
```

#### Step 2.5: Add RSS Discovery Link

**File:** `src/layouts/BaseHead.astro`

Add after favicon links:

```astro
<!-- RSS Feed -->
<link
  rel="alternate"
  type="application/rss+xml"
  title="Check Reaction Time Blog"
  href="/rss.xml"
/>
```

#### Step 2.6: Add Reading Time Helper

**File:** `src/lib/reading-time.ts` (NEW)

```typescript
import readingTime from "reading-time";

export function getReadingTime(content: string) {
    const stats = readingTime(content);
    return {
        text: stats.text,
        minutes: Math.ceil(stats.minutes),
        words: stats.words,
    };
}
```

#### Step 2.7: Update Blog Page Template

**File:** `src/pages/blogs/[...blog].astro`

Add reading time and enhanced schema:

```astro
---
import { getEntry } from 'astro:content';
import { getReadingTime } from '../../lib/reading-time';
import { getArticleSchema, getBreadcrumbSchema } from '../../lib/schema';
import StructuredData from '../../components/StructuredData.astro';

const entry = await getEntry('blogs', Astro.params.blog!);
const { Content } = await entry.render();
const readingStats = getReadingTime(entry.body);

// Note: Schema functions are now async due to jsonld validation
const articleSchema = await getArticleSchema(
  entry.data.title,
  entry.data.description,
  Astro.url.href,
  entry.data.publishDate || new Date(),
  entry.data.updatedOn
);

const breadcrumbs = await getBreadcrumbSchema([
  { name: 'Home', url: Astro.site! },
  { name: 'Blog', url: `${Astro.site}blogs/` },
  { name: entry.data.title, url: Astro.url.href },
]);
---

<BaseHead title={entry.data.pageTitle || entry.data.title}>
  <StructuredData slot="schema" schema={articleSchema} />
  <StructuredData slot="schema" schema={breadcrumbs} />
</BaseHead>

<!-- Display reading time -->
<p class="reading-time">{readingStats.text}</p>

<Content />
```

---

### **Phase 3: External Links & Security (Week 3)**

#### Step 3.1: Configure External Links

**File:** `astro.config.mjs`

Add rehype plugin for external links:

```javascript
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
    markdown: {
        rehypePlugins: [
            rehypeHeadingIds,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: "append",
                    // ... existing config
                },
            ],
            [
                rehypeExternalLinks,
                {
                    target: "_blank",
                    rel: ["noopener", "noreferrer"],
                    content: {
                        type: "text",
                        value: " ↗",
                    },
                },
            ],
        ],
    },
});
```

**Impact:** Security improvement and SEO best practice

#### Step 3.2: Update Main Pages with Schema

**Files to update:**

- `src/pages/index.astro`
- `src/pages/reaction-time-test/index.astro`
- `src/pages/number-memory-test/index.astro`

Example for homepage:

```astro
---
import { websiteSchema, webApplicationSchema } from '../lib/schema';
import StructuredData from '../components/StructuredData.astro';
---

<BaseHead title="Check Reaction Time - Test Your Reflexes">
  <StructuredData slot="schema" schema={websiteSchema} />
</BaseHead>
```

Example for reaction test page:

```astro
---
import { webApplicationSchema, getBreadcrumbSchema } from '../lib/schema';

// Schema functions are now async with jsonld validation
const breadcrumbs = await getBreadcrumbSchema([
  { name: 'Home', url: 'https://checkreactiontime.com' },
  { name: 'Reaction Time Test', url: 'https://checkreactiontime.com/reaction-time-test' }
]);
---

<BaseHead title="Reaction Time Test">
  <StructuredData slot="schema" schema={webApplicationSchema} />
  <StructuredData slot="schema" schema={breadcrumbs} />
</BaseHead>
```

**Note:** All schema functions are now async because they use `jsonld` library for validation in development mode.

---

### **Phase 4: Performance Monitoring & Optimization (Week 4)**

#### Step 4.1: Install Monitoring Tools

```bash
npm install -D lighthouse unlighthouse @lhci/cli
```

#### Step 4.2: Add Performance Scripts

**File:** `package.json`

```json
{
    "scripts": {
        "dev": "astro dev",
        "build": "astro build",
        "preview": "astro preview",
        "astro": "astro",

        "seo:audit": "unlighthouse --site http://localhost:4321 --build-static",
        "seo:lighthouse": "lighthouse http://localhost:4321 --view --preset=desktop",
        "seo:lighthouse:ci": "lhci autorun"
    }
}
```

#### Step 4.3: Create Lighthouse CI Config

**File:** `lighthouserc.js` (NEW)

```javascript
module.exports = {
    ci: {
        collect: {
            startServerCommand: "npm run preview",
            url: [
                "http://localhost:4321/",
                "http://localhost:4321/reaction-time-test/",
                "http://localhost:4321/number-memory-test/",
                "http://localhost:4321/blogs/",
            ],
            numberOfRuns: 3,
        },
        assert: {
            assertions: {
                "categories:performance": ["warn", { minScore: 0.85 }],
                "categories:accessibility": ["error", { minScore: 0.9 }],
                "categories:best-practices": ["warn", { minScore: 0.9 }],
                "categories:seo": ["error", { minScore: 0.95 }],

                // Core Web Vitals
                "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
                "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
                "cumulative-layout-shift": ["warn", { maxNumericValue: 0.1 }],
                "total-blocking-time": ["warn", { maxNumericValue: 300 }],
            },
        },
        upload: {
            target: "temporary-public-storage",
        },
    },
};
```

#### Step 4.4: Create Unlighthouse Config

**File:** `unlighthouse.config.ts` (NEW)

```typescript
export default {
    site: "http://localhost:4321",
    scanner: {
        device: "desktop",
        throttle: false,
        samples: 1,
        skipJavascript: false,
    },
    outputPath: "./unlighthouse-reports",
    cache: false,
    debug: false,
};
```

#### Step 4.5: GitHub Actions for CI/CD

**File:** `.github/workflows/lighthouse-ci.yml` (NEW)

```yaml
name: Lighthouse CI

on:
    pull_request:
        branches: [main]
    push:
        branches: [main]

jobs:
    lighthouse:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4

            - name: Setup Node
              uses: actions/setup-node@v4
              with:
                  node-version: "20"
                  cache: "npm"

            - name: Install dependencies
              run: npm ci

            - name: Build
              run: npm run build

            - name: Run Lighthouse CI
              run: npm run seo:lighthouse:ci
              env:
                  LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

---

### **Phase 5: Advanced Optimizations (Week 5-6)**

#### Step 5.1: Image Optimization Audit

**Action:** Review all images in public folder

1. Check if images are optimized
2. Convert to WebP/AVIF where possible
3. Add responsive images

**File:** `src/components/OptimizedImage.astro` (NEW)

```astro
---
import { Image } from 'astro:assets';

interface Props {
  src: ImageMetadata;
  alt: string;
  width: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  class?: string;
}

const {
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  class: className
} = Astro.props;

const aspectHeight = height || Math.floor(width * 0.75);
---

<Image
  src={src}
  alt={alt}
  width={width}
  height={aspectHeight}
  format="webp"
  quality={85}
  loading={loading}
  class={className}
/>
```

#### Step 5.2: Optimize Web Manifest

**File:** `public/site.webmanifest`

Ensure it includes:

```json
{
    "name": "Check Reaction Time",
    "short_name": "Reaction Test",
    "description": "Test and improve your reaction time",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#0d1b2a",
    "background_color": "#0d1b2a",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
        }
    ]
}
```

#### Step 5.3: Add theme-color Meta Tag

**File:** `src/layouts/BaseHead.astro`

```astro
<meta name="theme-color" content="#0d1b2a" />
<meta name="theme-color" content="#0d1b2a" media="(prefers-color-scheme: dark)" />
```

#### Step 5.4: Create Sitemap Enhancement

**File:** `astro.config.mjs`

Enhance sitemap configuration:

```javascript
sitemap({
  filter: (page) =>
    !page.includes('/admin/') &&
    !page.includes('/llms'),
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
  customPages: [
    'https://checkreactiontime.com/reaction-time-test',
    'https://checkreactiontime.com/number-memory-test',
  ],
  i18n: {
    defaultLocale: 'en',
    locales: {
      en: 'en-US',
    },
  },
}),
```

---

## 📁 File Structure After Implementation

```
src/
├── components/
│   ├── StructuredData.astro (UPDATED)
│   └── OptimizedImage.astro (NEW)
├── config/
│   └── fonts.ts (NEW)
├── layouts/
│   ├── BaseHead.astro (UPDATED)
│   └── BaseLayout.astro (UPDATED)
├── lib/
│   ├── schema.ts (NEW)
│   └── reading-time.ts (NEW)
├── pages/
│   ├── rss.xml.ts (NEW)
│   ├── index.astro (UPDATED)
│   ├── blogs/
│   │   └── [...blog].astro (UPDATED)
│   ├── reaction-time-test/
│   │   └── index.astro (UPDATED)
│   └── number-memory-test/
│       └── index.astro (UPDATED)
└── content.config.ts (UPDATED)

Root:
├── astro.config.mjs (UPDATED)
├── lighthouserc.js (NEW)
├── unlighthouse.config.ts (NEW)
└── .github/
    └── workflows/
        └── lighthouse-ci.yml (NEW)
```

---

## ✅ Testing Checklist

After each phase, run these tests:

### Phase 1 Tests

```bash
npm run build
npm run preview

# Check in browser DevTools:
# - Fonts loaded via <link> not @import
# - Google Analytics in Partytown
# - CSS/JS minified
```

### Phase 2 Tests

```bash
# Visit /rss.xml - should display feed
# Check browser: Reading time appears on blogs
# Validate schema at https://validator.schema.org/
```

### Phase 3 Tests

```bash
# Check external links open in new tab
# Verify rel="noopener noreferrer" in HTML
# Test breadcrumbs in Google Rich Results
```

### Phase 4 Tests

```bash
npm run build
npm run preview
npm run seo:lighthouse
npm run seo:audit

# Review reports for:
# - Performance score > 85
# - SEO score > 95
# - Accessibility score > 90
```

---

## 🎯 Success Metrics

### Performance Targets

- **Lighthouse Performance:** 90+
- **Lighthouse SEO:** 100
- **Lighthouse Accessibility:** 95+
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

### SEO Targets

- All pages have unique meta descriptions
- All images have alt text
- RSS feed validates
- Structured data validates
- Sitemap includes all pages
- Mobile-friendly (Google test)

---

## 🔧 Maintenance Plan

### Weekly

- Run `npm run seo:audit` and review report
- Check Google Search Console for errors
- Monitor Core Web Vitals

### Monthly

- Update blog publish dates in frontmatter
- Review and refresh meta descriptions
- Check for broken links
- Update schema markup if needed

### Quarterly

- Run full Lighthouse CI audit
- Review competitor SEO
- Update structured data
- Analyze performance trends

---

## 📚 Additional Resources

### Documentation

- [Astro SEO Guide](https://docs.astro.build/en/guides/seo/)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)

### Tools for Validation

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### Monitoring

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [web.dev Measure](https://web.dev/measure/)

---

## 🚀 Next Steps

1. **Review this plan** - Ensure it aligns with your goals
2. **Set up development branch** - `git checkout -b seo-improvements`
3. **Start Phase 1** - Focus on quick wins first
4. **Test incrementally** - Don't wait until the end
5. **Deploy to staging** - Test before production
6. **Monitor metrics** - Track improvements

---

**Estimated Total Time:** 40-60 hours of development  
**Expected Performance Improvement:** 20-30 points on Lighthouse  
**Expected SEO Improvement:** 5-10 points on Lighthouse SEO

**Last Updated:** February 2026
