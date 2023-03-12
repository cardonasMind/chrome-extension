import React, { useState, useEffect } from "react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksLoaded, setBookmarksLoaded] = useState(false);

  useEffect(() => {
    chrome.storage !== undefined &&
      chrome.storage.local.get("bookmarks", (result) => {
        setBookmarks(result);
        setBookmarksLoaded(true);
      });
  }, []);

  const handleDeleteBookmarkClick = (index) => {
    bookmarks.splice(index, 1);
    chrome.storage !== undefined &&
      chrome.storage.local.set({ bookmarks }, function () {
        console.log("Bookmark deleted!");
      });
  };

  return (
    <>
      <h1>b</h1>
      {console.log("bookmarks isss", bookmarks)}

      {bookmarksLoaded && bookmarks.length > 0 ? (
        <ul>
          {bookmarks.map((bookmark, index) => (
            <li key={index}>
              <a href={bookmark}>{bookmark}</a>
              <button onClick={() => handleDeleteBookmarkClick(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookmarks saved yet.</p>
      )}
    </>
  );
};

export default Bookmarks;
