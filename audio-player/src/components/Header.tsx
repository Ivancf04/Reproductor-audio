import IconButton from "./IconButton";
import styles from "./css/Header.module.css";

type HeaderProps = {
  title: string;
  iconUrl: string;
  onIconClick: () => void;
};

const Header = ({ title, iconUrl, onIconClick }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.titulo}>{title}</h1>
      <IconButton iconUrl={iconUrl} onClick={onIconClick} />
    </header>
  );
};

export default Header;
