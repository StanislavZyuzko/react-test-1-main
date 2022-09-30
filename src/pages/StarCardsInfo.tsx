import StarCardsList from "../components/StarCardsList";
import { ICharacter } from "../interfaces";
import useFilter from "../hooks/useFilter";

interface CharactersProps {
  characters: Array<ICharacter>;
  setResults: React.Dispatch<React.SetStateAction<Array<ICharacter>>>;
}

function StarCardsInfo(props: CharactersProps) {
  const { characters, setResults } = props;
  const { value, filteredArr, totalMass, setRemove, onChange } =
    useFilter(characters);

  return (
    <>
      <h1>List of Characters</h1>
      <form>
        <input
          value={value}
          type="text"
          placeholder="Search for a character"
          onChange={onChange}
        />
      </form>
      <div>
        <h3>
          {filteredArr.length} characters — total mass {totalMass} kg
        </h3>
      </div>
      <div>
        <div>
          <StarCardsList
            setResults={setResults}
            setRemove={setRemove}
            characters={filteredArr}
          />
        </div>
      </div>
    </>
  );
}

export default StarCardsInfo;
