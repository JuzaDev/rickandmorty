import { useCallback, useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import PreferredInput from "../components/PreferredInput";
import { useInView } from "react-intersection-observer";
import useCharacters from "../hooks/useCharactersQuery";
import Modal from "../components/Modal";
import { Character } from "../api/models/models";
import CharacterDetails from "../components/CharacterDetails";
import useDebounce from "../hooks/useDebouce";

function Characters() {

  const { ref, inView } = useInView({});
  const [inputFilter, setInputFilter] = useState("");
  const debouncedInputValue = useDebounce(inputFilter, 400);
  const [showPreferredOnly, setShowPreferredOnly] = useState(false);
  const [preferredCharacterIds, setPreferredCharacterIds] = useState<number[]>(
    []
  );

  const [characterToShowOnModal, setCharacterToShowOnModal] =
    useState<Character>();
  const handleOpenModal = (character: Character) => {
    setCharacterToShowOnModal(character);
  };
  const handleCloseModal = () => setCharacterToShowOnModal(undefined);

  const {
    data: characters,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useCharacters({
    inputFilter: debouncedInputValue,
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (inView) {
        fetchNextPage();
      }
    }, 100);
    return () => clearTimeout(timeOut);
  }, [inView, isFetchingNextPage, fetchNextPage]);

  const handlePreferred = (characterId: number) => {
    setPreferredCharacterIds((preferred) =>
      preferred.includes(characterId)
        ? preferred.filter((id) => id !== characterId)
        : preferred.concat(characterId)
    );
  };

  const displayFetchRef = useCallback(
    (i: number) => {
      return (
        !isLoading &&
        !isFetchingNextPage &&
        hasNextPage &&
        i + 1 !== characters.length
      );
    },
    [isLoading, isFetchingNextPage, hasNextPage, characters]
  );

  return (
    <div className="characters-page">
      <div className="header-filters">
        <input
          type="text"
          placeholder="Type to filter by name"
          onChange={(event) => setInputFilter(event.target.value)}
        />
        <PreferredInput
          showPreferredOnly={showPreferredOnly}
          setShowPreferredOnly={setShowPreferredOnly}
        />
      </div>
      <div className="container">
        {characters
          ?.filter((c) =>
            showPreferredOnly ? preferredCharacterIds.includes(c.id) : true
          )
          .map((c, i) => (
            <CharacterCard
              {...(displayFetchRef(i) && { innerRef: ref })}
              key={c.id}
              handlePreferred={handlePreferred}
              character={c}
              isPreferred={preferredCharacterIds.includes(c.id)}
              onClick={handleOpenModal}
            />
          ))}

        {characterToShowOnModal && (
          <Modal
            content={<CharacterDetails character={characterToShowOnModal} />}
            onClose={handleCloseModal}
          />
        )}

        {!(isLoading || characters.length) && "No data"}
        {isLoading && "Loading..."}
      </div>
    </div>
  );
}

export default Characters;
