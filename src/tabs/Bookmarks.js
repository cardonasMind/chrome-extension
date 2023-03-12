import React, { useState, useEffect } from "react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    chrome.storage !== undefined &&
      chrome.storage.local.get("bookmarks", (result) => {
        console.log(result);
        setBookmarks(result);
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
      <h1>Bookmarks</h1>
      {console.log("bookmarks isss", bookmarks)}

      {bookmarks.length > 0 &&
        bookmarks.map((bookmark, index) => (
          <tr key={index}>
            <td>{bookmark}</td>
            <td>
              <button onClick={() => handleDeleteBookmarkClick(index)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
    </>
  );
};

export default Bookmarks;
