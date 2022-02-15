import { useEffect, useState } from "react";
import Card from "./Card";
import "./App.css";

function App() {
  const [hitsPerPage, setHitsPerPage] = useState(10);
  const [freeSearch, setFreeSearch] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [objArr, setObjArr] = useState([]);
  const firstPage = 1;

  const handleHitsPerPage = (e) => {
    setHitsPerPage(Number(e.target.value));
  };

  const handleFreeSearch = (e) => {
    setFreeSearch(e.target.value);
  };

  const handleCurrentPage = (e) => {
    setPage(e.target.innerHTML);
  };

  const handlePrevPage = () => {
    setPage(Number(page) - 1);
  };

  const handleNextPage = () => {
    setPage(Number(page) + 1);
  };

  const url = `https://support.infocaption.com/API/lucene/guidesearch?hitsPerPage=${hitsPerPage}&searchQuery=${freeSearch}&page=${page}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMaxPage(data.totalPages);
        setObjArr(data.results);
      });
  }, [page, hitsPerPage, url]);

  return (
    <div className="App">
      <h1 className="heading">Guider</h1>
      <div className="search-fields">
        <form className="search-form">
          <input
            type="text"
            className="search-field"
            placeholder="Keywords"
            onChange={handleFreeSearch}
          />
        </form>
      </div>
      {objArr.length > 0 &&
        objArr.map((obj, i) => (
          <Card
            key={i}
            name={obj.name ?? `Title missing`}
            publicationDate={obj.publicationDate ?? `publication date missing`}
            content={obj.content ?? `NO CONENT`}
            firstLastName={
              obj.FirstLastName && /\S/.test(obj.FirstLastName)
                ? obj.FirstLastName
                : `Author unknown`
            }
          />
        ))}
      <div className="search-fields">
        <form>
          <label htmlFor="hits-select">Views per page: </label>
          <select
            onChange={handleHitsPerPage}
            defaultValue="10"
            id="hits-select"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
        </form>
      </div>
      <div className="pagination-row">
        {page > 1 && (
          <button className="pagination-button" onClick={handlePrevPage}>
            ⊲
          </button>
        )}
        {page > 2 && (
          <button className="pagination-button" onClick={handleCurrentPage}>
            {firstPage}
          </button>
        )}
        {page > 2 && <div className="pagination-dots">...</div>}
        {page > 1 && (
          <button className="pagination-button" onClick={handleCurrentPage}>
            {Number(page) - 1}
          </button>
        )}
        <button
          className="pagination-button current"
          onClick={handleCurrentPage}
        >
          {page}
        </button>
        {page < maxPage && (
          <button className="pagination-button" onClick={handleCurrentPage}>
            {Number(page) + 1}
          </button>
        )}
        {page < maxPage - 1 && <div className="pagination-dots">...</div>}
        {page < maxPage - 1 && (
          <button className="pagination-button" onClick={handleCurrentPage}>
            {maxPage}
          </button>
        )}
        {page < maxPage && (
          <button className="pagination-button" onClick={handleNextPage}>
            ⊳
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
