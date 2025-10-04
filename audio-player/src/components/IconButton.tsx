import "./css/IconButton.css"

type IconButtonProps = {
  iconUrl: string;
  onClick: () => void;
  alt?: string;
}

const IconButton = ({ iconUrl, onClick, alt = "icon" }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      id="button"
    >
      <img src={iconUrl} alt={alt} id="img" />
    </button>
  );
};

export default IconButton;