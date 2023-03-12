import React, { useState, useEffect } from "react";

import "./styles.css";

import ShopifyScraper from "./tabs/ShopifyScraper";
import Bookmarks from "./tabs/Bookmarks";

function App() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [activeTab, setActiveTab] = useState("Shopify Scraper");

  useEffect(() => {
    chrome.tabs !== undefined &&
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        setCurrentUrl(tabs[0].url);
      });
  });

  const handleBookmarkClick = () => {
    chrome.storage.local.get("bookmarks", function (result) {
      const bookmarks = result.bookmarks || [];
      bookmarks.push(currentUrl);
      chrome.storage.local.set({ bookmarks }, function () {
        console.log("Bookmark saved!");
      });
    });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div id="header">
        <button className="primary-button" onClick={handleBookmarkClick}>
          Bookmark
        </button>
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
        {activeTab === "Bookmarks" && <Bookmarks />}
      </div>
    </div>
  );
}

export default App;
