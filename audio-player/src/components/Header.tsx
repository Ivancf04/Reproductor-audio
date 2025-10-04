import IconButton from "./IconButton";
import "./css/Header.css"

type HeaderProps = {
  title: string;
  iconUrl: string;
  onIconClick: () => void;
}

const Header = ({ title, iconUrl, onIconClick }: HeaderProps) => {
  return (
    <header>
      <h1 id="titulo">{title}</h1>
      <IconButton iconUrl={iconUrl} onClick={onIconClick} />
    </header>
  );
};

export default Header;