import React, { useState, useEffect, useMemo } from "react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    chrome.storage !== undefined &&
      chrome.storage.local.get("bookmarks", (result) => setBookmarks(result));
  }, []);

  const handleDeleteBookmark = (index) => {
    bookmarks.splice(index, 1);
    chrome.storage !== undefined &&
      chrome.storage.local.set({ bookmarks }, function () {
        console.log("Bookmark deleted!");
      });
  };

  const BookmarkList = useMemo(() => {
    return (
      <ul>
        {bookmarks.length > 0 &&
          bookmarks.map((bookmark, index) => (
            <li key={index}>
              <a href={bookmark}>{bookmark}</a>
              <button onClick={() => handleDeleteBookmark(index)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    );
  }, [bookmarks]);

  return (
    <>
      <h1>b</h1>
      {console.log("bookmarks isss", bookmarks)}

      <BookmarkList />

      {bookmarks.length > 0 ? BookmarkList : <p>No bookmarks saved yet.</p>}
    </>
  );
};

export default Bookmarks;
