import { useState } from "react";
import Card from "./Card";
import "./App.css";

function App() {
  const [hitsPerPage, setHitsPerPage] = useState(10);
  const [freeSearch, setFreeSearch] = useState("");
  const [objArr, setObjArr] = useState([]);

  const handleHitsPerPage = (e) => {
    setHitsPerPage(Number(e.target.value));
  };

  const handleFreeSearch = (e) => {
    setFreeSearch(e.target.value);
  };

  const url = `https://support.infocaption.com/API/lucene/guidesearch?hitsPerPage=${hitsPerPage}&searchQuery=${freeSearch}`;

  const handleSearch = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setObjArr(data.results);
        console.log(data);
      });
  };

  console.log(hitsPerPage);

  return (
    <div className="App">
      <h1 className="heading">Guider</h1>
      <div className="search-fields">
        <form>
          <input
            type="text"
            placeholder="Keywords"
            onChange={handleFreeSearch}
          />
        </form>
        <form>
          <label htmlFor="hits-select">Hits per page: </label>
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
        <button onClick={handleSearch}>Search</button>
      </div>
      {objArr.length > 0 &&
        objArr.map((obj, i) => (
          <Card
            key={i}
            name={obj.name ?? `Title missing`}
            publicationDate={obj.publicationDate ?? `publication date missing`}
            content={obj.content ?? `NO CONENT`}
            firstLastName={
              obj.FirstLastName || /\S/.test(obj.FirstLastName)
                ? obj.FirstLastName
                : `Author N/A`
            }
          />
        ))}
    </div>
  );
}

export default App;
