import React, { useState, useEffect, useRef } from "react";
import { get } from "lodash";
import Axios from "axios";

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getData();
    // Axios.get("http://hn.algolia.com/api/v1/search?query=reacthooks");
    // .then(
    //   res => {
    //     setResults(get(res, "data.hits"));
    //     // console.log(get(res, "data.hits"));
    //   }
    // );
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(get(response, "data.hits"));
    } catch (err) {
      setError(err);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleSearch = event => {
    event.preventDefault();
    getData();
  };

  const handleClearSearch = event => {
    event.preventDefault();
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo image"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form onClick={handleSearch} className="mb-2">
        <input
          className="border p-1 rounded"
          type="text"
          placeholder="search"
          onChange={e => setQuery(e.target.value)}
          value={query}
          ref={searchInputRef}
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="bg-teal text-white rounded m-1 p-1"
        >
          Clear
        </button>
      </form>
      {loading ? (
        <div className="font-bold text-orange-dark">Loading results...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(el => (
            <li key={el.objectID}>
              <a
                href={el.url}
                className="text-indigo-dark hover:text-indigo-darkest"
              >
                {el.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="text-red font-bold">{error && error.message}</div>
    </div>
  );
}
