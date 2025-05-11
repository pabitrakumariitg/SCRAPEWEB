## 📄 Simple Website Scraper

This is a **Node.js script** that scrapes a static website (default: Wikipedia Atom page) to extract:

* Page title and description
* Headings (`<h1>`, `<h2>`, `<h3>`)
* Links (`<a>`)
* Images (`<img>`)
* Paragraphs (`<p>`)

Scraped data is saved to a JSON file locally.

---

### 🚀 Getting Started

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/simple-website-scraper.git
cd simple-website-scraper
```

#### 2. Install Dependencies

Make sure you have Node.js installed. Then run:

```bash
npm install axios cheerio
```

---

### 🛠️ Usage

Simply run the script with:

```bash
node simple-scraper.js
```

It will:

* Scrape the URL defined in the script (`https://en.wikipedia.org/wiki/Atom` by default)
* Save the extracted content to a file named: `en_wikipedia_org_scraped.json`

---

### 📁 Output Example (JSON)

```json
{
  "url": "https://en.wikipedia.org/wiki/Atom",
  "title": "Atom - Wikipedia",
  "description": "...",
  "headings": {
    "h1": ["Atom"],
    "h2": ["History", "Structure"],
    "h3": ["Early models", "Modern quantum model"]
  },
  "links": [
    {
      "text": "Periodic table",
      "href": "https://en.wikipedia.org/wiki/Periodic_table"
    }
  ],
  "images": [
    {
      "src": "https://upload.wikimedia.org/example.png",
      "alt": "Atomic structure"
    }
  ],
  "mainContent": ["An atom is the smallest unit of ordinary matter..."]
}
```

---

### ✏️ Customization

To scrape a different site:

1. Open `simple-scraper.js`
2. Change the `URL` variable at the top of the file to your desired site:

```js
const URL = 'https://example.com';
```

---

### 🧪 Notes

* This script uses a simple structure — ideal for educational purposes or quick scraping tasks.
* It **does not** handle JavaScript-rendered content. For that, use **Puppeteer** or **Playwright**.

