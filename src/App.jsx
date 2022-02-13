import { useState } from "react";
import Card from "./Card";

function App() {
  const [hitsPerPage, setHitsPerPage] = useState(10);
  const [objArr, setObjArr] = useState([]);

  const handleHitsPerPage = (e) => {
    setHitsPerPage(e.target.value);
  };

  const url = `https://support.infocaption.com/API/lucene/guidesearch?hitsPerPage=${hitsPerPage}`;

  const handleSearch = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setObjArr(data.results);
        console.log(data);
      });
  };

  return (
    <div className="App">
      <h1>Guider</h1>
      <form>
        <input
          type="number"
          placeholder="Hits per page"
          onChange={handleHitsPerPage}
        />
      </form>
      <button onClick={handleSearch}>Search</button>
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
