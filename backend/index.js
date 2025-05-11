const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const path = require("path");

const URL = "https://en.wikipedia.org/wiki/Atom";

async function scrapeWebsite(url) {
  try {
    console.log(`Fetching data from ${url}...`);

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    };

    const response = await axios.get(url, { headers });
    const html = response.data;
    const $ = cheerio.load(html);

    return {
      url,
      title: $("title").text().trim(),
      description: $('meta[name="description"]').attr("content") || "",
      headings: {
        h1: $("h1")
          .map((_, el) => $(el).text().trim())
          .get(),
        h2: $("h2")
          .map((_, el) => $(el).text().trim())
          .get(),
        h3: $("h3")
          .map((_, el) => $(el).text().trim())
          .get(),
      },
      links: $("a")
        .map((_, el) => {
          const href = $(el).attr("href");
          if (
            href &&
            !href.startsWith("#") &&
            !href.startsWith("javascript:")
          ) {
            return {
              text: $(el).text().trim() || "[No Text]",
              href: href.startsWith("http")
                ? href
                : new URL(href, url).toString(),
            };
          }
        })
        .get()
        .filter(Boolean),
      images: $("img")
        .map((_, el) => {
          const src = $(el).attr("src");
          if (src) {
            return {
              src: src.startsWith("http") ? src : new URL(src, url).toString(),
              alt: $(el).attr("alt") || "",
            };
          }
        })
        .get()
        .filter(Boolean),
      mainContent: $("p")
        .map((_, el) => $(el).text().trim())
        .get()
        .filter((text) => text.length > 10),
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    process.exit(1);
  }
}

async function saveToFile(data, url) {
  try {
    const hostname = new URL(url).hostname;
    const filename = `${hostname.replace(/\./g, "_")}_scraped.json`;
    const outputPath = path.join(process.cwd(), filename);
    await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${outputPath}`);
  } catch (error) {
    console.error("Error saving data:", error.message);
  }
}

(async () => {
  const data = await scrapeWebsite(URL);
  await saveToFile(data, URL);
})();
