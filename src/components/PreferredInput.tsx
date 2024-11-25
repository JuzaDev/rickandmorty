interface Props {
  showPreferredOnly: boolean;
  setShowPreferredOnly: (value: boolean) => void;
}

export default function TogglePreferred({
  showPreferredOnly,
  setShowPreferredOnly,
}: Props) {
  return (
    <button
      type="button"
      onClick={() => setShowPreferredOnly(!showPreferredOnly)}
      className="toggle-show-preferred"
    >
      {showPreferredOnly ? "Show all" : "Show preferred only"}
    </button>
  );
}
