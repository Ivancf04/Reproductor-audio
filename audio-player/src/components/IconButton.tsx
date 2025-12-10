import styles from "./css/IconButton.module.css";

type IconButtonProps = {
  iconUrl: string;
  ref?: React.Ref<HTMLImageElement>;
  onClick: () => void;
  alt?: string;
  className?: string;
};

const IconButton = ({ ref, iconUrl, onClick, alt = "icon", className }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className || ""}`}
    >
      <img ref={ref} src={iconUrl} alt={alt} className={styles.img} />
    </button>
  );
};

export default IconButton;
