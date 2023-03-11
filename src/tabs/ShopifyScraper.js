import React, { useState, useEffect } from "react";

const ShopifyScraper = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [includeImages, setIncludeImages] = useState(false);
  const [numProducts, setNumProducts] = useState(0);
  const [numCollections, setNumCollections] = useState(0);

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
  };

  return (
    <div className="tab-content">
      <h2>{window.location.hostname}</h2>
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
        <button type="submit">Export</button>
      </form>
      <p>
        {numProducts} products, {numCollections} collections
      </p>
    </div>
  );
};

export default ShopifyScraper;
