import React, { useState, useEffect } from "react";

const ShopifyScraper = () => {
  const [collections, setCollections] = useState(["Glasess, Street"]);
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [includeImages, setIncludeImages] = useState(false);
  const [numProducts, setNumProducts] = useState(0);
  const [numCollections, setNumCollections] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    chrome.tabs !== undefined &&
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        setCurrentUrl(tabs[0].url);
      });
  });

  const [data, setData] = useState([]);

  const fetchItems = async () => {
    const apiUrl =
      "https://api.apify.com/v2/acts/pocesar~shopify-scraper/run-sync-get-dataset-items";
    const token = "apify_api_SjYbX1EVfHt7YBRGojv10i4cFRUIOg0nnpVx";

    const inputData = {
      checkForBanner: true,
      debugLog: false,
      extendOutputFunction:
        "async ({ data, item, product, images, fns, name, request, variants, context, customData, input, Apify }) => {\n  return item;\n}",
      extendScraperFunction:
        "async ({ fns, customData, Apify, label }) => {\n \n}",
      fetchHtml: false,
      maxConcurrency: 10,
      maxRequestRetries: 3,
      maxRequestsPerCrawl: 4, // Maximum number of items to scrape. Set it to 0 to scrape everything.
      proxyConfig: {
        useApifyProxy: true,
      },
      startUrls: [
        {
          url: currentUrl,
        },
      ],
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    };

    const response = await fetch(`${apiUrl}?token=${token}`, options);
    const data = await response.json();
    setData(data);
  };

  // Calculate number of collections
  useEffect(() => {
    const numCols = selectedCollection === "All" ? collections.length - 1 : 1;
    setNumCollections(numCols);
  }, [selectedCollection, collections]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const includeImagesText = includeImages ? " (including images)" : "";
    alert(`Exporting ${selectedCollection} collection${includeImagesText}...`);
    fetchItems();
  };

  const tableData = data.length > 0 && data.slice(0, 5);

  return (
    <>
      <h2 id="current-url">{currentUrl}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="collection">Collection:</label>
        <select
          id="collection"
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
        >
          {collections.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        <div>
          <input
            type="checkbox"
            id="includeImages"
            checked={includeImages}
            onChange={(e) => setIncludeImages(e.target.checked)}
          />
          <label htmlFor="includeImages">Include images</label>
        </div>
        <button type="submit" id="export-button">
          Export
        </button>
      </form>
      <p>
        {numProducts} products, {numCollections} collections
      </p>

      {tableData.length > 0 && tableData.map((item) => console.log(item))}
    </>
  );
};

export default ShopifyScraper;
