import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import StarCardsFilter from "./components/StarCardsFilter";
import StarCardsInfo from "./pages/StarCardsInfo";
import StarCardDetails from "./pages/StarCardDetails";
import { ICharacter } from "./interfaces";

function App() {
  const [results, setResults] = useState<Array<ICharacter>>([]);
  const [err, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<any>(false);

  useEffect(() => {
    const getCharacters = async () => {
      const initialCharacters = await fetch("https://swapi.dev/api/people")
        .then((response) => {
          return response.json();
        })
        .then((res) =>
          res.results.map((elem: ICharacter) => ({ ...elem, favorites: false }))
        )
        // .then(() => {
        //   throw new Error("test message!");
        // })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        })
        .finally(() => setIsLoaded(true));

      const requests = initialCharacters.map((character: ICharacter) =>
        fetch(character.homeworld)
      );

      Promise.all(requests)
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((resArr) =>
          initialCharacters.map((character: ICharacter, index: number) => ({
            ...character,
            homeworld: resArr[index].name,
          }))
        )
        .then((resArr) => {
          setResults(resArr);
          return resArr;
        });
    };

    getCharacters();
  }, []);

  if (err) {
    return <div>Error: {err}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Link className="menu-link" to="/">
        tile{" "}
      </Link>
      <Link className="menu-link" to="/list">
        list{" "}
      </Link>

      <Routes>
        <Route
          path="/"
          element={
            <StarCardsFilter setResults={setResults} characters={results} />
          }
        />
        <Route
          path="list"
          element={
            <StarCardsInfo setResults={setResults} characters={results} />
          }
        />
        <Route
          path="details/:name"
          element={<StarCardDetails characters={results} />}
        />
      </Routes>
    </div>
  );
}

export default App;
