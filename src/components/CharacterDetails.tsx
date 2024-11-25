import { Character } from "../api/models/models";
import useEpisodesQuery from "../hooks/useEpisodesQuery";

interface Props {
  character: Character;
}

function CharacterDetails({ character }: Props) {
  const { data: episodes } = useEpisodesQuery({ episodes: character.episode });

  return (
    <div className="character-detail">
      <div className="character-info">
        <h2 className="character-name">{character.name}</h2>
        <p>
          <strong>Species:</strong> {character.species}
        </p>
        <p>
          <strong>Status:</strong> {character.status}
        </p>
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>Last Known Location:</strong> {character.location.name}
        </p>
      </div>

      <div className="episodes-list-container">
        <h3>Episodes:</h3>
        {!!episodes.length && (
          <ul className="episodes-list">
            {episodes.map((episode) => (
              <li key={episode.id}>{episode.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CharacterDetails;
