import "./css/IconButton.css"

type IconButtonProps = {
  iconUrl: string;
  ref ?: React.Ref<HTMLImageElement>;
  onClick: () => void;
  alt?: string;
}

const IconButton = ({ref, iconUrl, onClick, alt = "icon" }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      id="button"
    >
      <img ref={ref} src={iconUrl} alt={alt} id="img" />
    </button>
  );
};

export default IconButton;