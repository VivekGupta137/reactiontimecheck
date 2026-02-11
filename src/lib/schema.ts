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
    sameAs: [], // Add social media links here
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
