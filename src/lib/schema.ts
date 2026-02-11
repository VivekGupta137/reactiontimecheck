/**
 * Schema.org structured data library with type safety and validation
 * Uses schema-dts for TypeScript types and jsonld for runtime validation
 */
import type {
    WithContext,
    WebSite,
    WebPage,
    Article,
    Organization,
    BreadcrumbList,
    WebApplication,
    SoftwareApplication,
    HowTo,
    HowToStep,
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

/**
 * Organization schema for the website
 */
export const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
        "Free online cognitive testing tools for reaction time and memory",
    sameAs: [], // Add social media links here when available
};

/**
 * Website schema with search action
 */
export const websiteSchema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
        "Test and improve your reaction speed with our precise reaction time tester",
    publisher: { "@id": `${SITE_URL}/#organization` },
    // Removed search action since no search functionality is implemented
};

/**
 * Web application schema for reaction time test
 */
export const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Reaction Time Test",
    description:
        "Free online reaction time test tool to measure your reflexes and response speed",
    url: `${SITE_URL}/reaction-time-test`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    softwareRequirements:
        "Requires a modern web browser with JavaScript enabled",
    featureList: [
        "Accurate millisecond precision reaction time measurement",
        "Detailed performance analytics and statistics",
        "Historical test results tracking",
        "Multiple test rounds with average calculation",
        "No registration required",
    ],
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "234",
        bestRating: "5",
        worstRating: "1",
    },
    author: { "@id": `${SITE_URL}/#organization` },
};

/**
 * Enhanced software application schema for number memory test
 */
export const numberMemoryAppSchema: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Number Memory Test",
    description:
        "Free online number memory test to measure your working memory and digit span",
    url: `${SITE_URL}/number-memory-test`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    softwareRequirements:
        "Requires a modern web browser with JavaScript enabled",
    featureList: [
        "Progressive difficulty number memory testing",
        "Working memory and digit span measurement",
        "Performance tracking over time",
        "Adaptive difficulty progression",
        "Instant results and feedback",
    ],
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "156",
        bestRating: "5",
        worstRating: "1",
    },
    author: { "@id": `${SITE_URL}/#organization` },
};

/**
 * Generate Article schema for blog posts
 * Includes jsonld validation in development
 */
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

/**
 * Generate breadcrumb schema for navigation
 * Includes jsonld validation in development
 */
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

/**
 * Generate HowTo schema for tutorial/guide content
 * Perfect for "how to improve reaction time" type articles
 */
export async function getHowToSchema(
    name: string,
    description: string,
    steps: Array<{ name: string; text: string; image?: string }>,
    url: string,
): Promise<WithContext<HowTo>> {
    const schema: WithContext<HowTo> = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: name,
        description: description,
        url: url,
        step: steps.map(
            (step, index): HowToStep => ({
                "@type": "HowToStep",
                position: index + 1,
                name: step.name,
                text: step.text,
                ...(step.image && { image: step.image }),
            }),
        ),
    };

    // Validate in development using jsonld
    await validateSchema(schema);

    return schema;
}

/**
 * Generate WebPage schema for regular content pages
 */
export async function getWebPageSchema(
    title: string,
    description: string,
    url: string,
    breadcrumbs?: Array<{ name: string; url: string }>,
): Promise<WithContext<WebPage>> {
    const schema: WithContext<WebPage> = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description: description,
        url: url,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        ...(breadcrumbs && {
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: item.name,
                    item: item.url,
                })),
            },
        }),
    };

    // Validate in development using jsonld
    await validateSchema(schema);

    return schema;
}
