import React, { useState, useEffect } from "react";

const ShopifyScraper = () => {
  const [data, setData] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [includeImages, setIncludeImages] = useState(false);
  const [numProducts, setNumProducts] = useState(0);
  const [numCollections, setNumCollections] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("https://sidemenclothing.com/");

  useEffect(() => {
    chrome.tabs !== undefined &&
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        setCurrentUrl(tabs[0].url);
      });
  });

  useEffect(() => {
    fetchItems();
  }, [currentUrl]);

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
    setNumProducts(data.length);
  };

  // Calculate number of collections
  /*useEffect(() => {
    const numCols = selectedCollection === "All" ? collections.length - 1 : 1;
    setNumCollections(numCols);
  }, [selectedCollection, collections]);*/

  const convertToCSV = () => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((obj) =>
      Object.values(obj)
        .map((val) => (typeof val === "string" ? `"${val}"` : val))
        .join(",")
    );
    return [headers, ...rows].join("\n");
  };

  const downloadCSV = () => {
    const csvData = convertToCSV();
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    downloadCSV();
  };

  return (
    <>
      <h2 id="current-url">{currentUrl}</h2>

      {data.length > 0 ? (
        <>
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
        </>
      ) : (
        <p>Products are being scrape</p>
      )}
    </>
  );
};

export default ShopifyScraper;
