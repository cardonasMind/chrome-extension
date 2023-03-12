import React, { useState } from "react";

import "./styles.css";

import ShopifyScraper from "./tabs/ShopifyScraper";

function App() {
  const [activeTab, setActiveTab] = useState("Shopify Scraper");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div id="header">
        <button className="primary-button">Bookmark</button>
        <h2>My Extension</h2>
        <button className="primary-button">See FB ads</button>
      </div>
      <div id="tabs">
        <div
          className={`tab ${activeTab === "Shopify Scraper" ? "active" : ""}`}
          onClick={() => handleTabClick("Shopify Scraper")}
        >
          Shopify Scraper
        </div>
        <div
          className={`tab ${activeTab === "Facebook Spy" ? "active" : ""}`}
          onClick={() => handleTabClick("Facebook Spy")}
        >
          Facebook Spy
        </div>
        <div
          className={`tab ${activeTab === "Bookmarks" ? "active" : ""}`}
          onClick={() => handleTabClick("Bookmarks")}
        >
          Bookmarks
        </div>
      </div>
      <div className="tab-content">
        {activeTab === "Shopify Scraper" && <ShopifyScraper />}
        {activeTab === "Facebook Spy" && <p>Facebook Spy content goes here</p>}
        {activeTab === "Bookmarks" && <p>Bookmarks content goes here</p>}
      </div>
    </div>
  );
}

export default App;
