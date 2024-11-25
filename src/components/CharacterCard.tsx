import { Character } from "../api/models/models";
import AddToPreferredIcon from "../assets/heart-outline-icon.svg";
import RemoveToPreferredIcon from "../assets/heart-black-icon.svg";
import { LegacyRef } from "react";

interface Props {
  character: Character;
  isPreferred: boolean;
  handlePreferred: (characterId: number) => void;
  innerRef?: LegacyRef<HTMLDivElement> | undefined;
  onClick: (character: Character) => void;
}

function CharacterCard({
  character,
  isPreferred,
  handlePreferred,
  innerRef,
  onClick,
}: Props) {
  return (
    <div
      className="character-card-container"
      {...(innerRef && { ref: innerRef })}
      onClick={() => onClick(character)}
    >
      <img
        onClick={(event) => {
          event.stopPropagation();
          handlePreferred(character.id);
        }}
        src={isPreferred ? RemoveToPreferredIcon : AddToPreferredIcon}
        alt={character.name}
        className="preferred-icon"
      />
      <img src={character.image} alt="Avatar" className="avatar-image" />
      <div className="overlay">
        <h4 className="name">{character.name}</h4>
      </div>
    </div>
  );
}

export default CharacterCard;
