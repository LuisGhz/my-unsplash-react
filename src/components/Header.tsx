import React from "react";
import "./Header.css";
import MyUnsplashLogo from "../assets/my_unsplash_logo.svg";
import { AddPhoto } from "../modals/AddPhoto";
import { ModalsContainer } from "../modals/ModalsContainer";

type HeaderProps = {
  onSearch: (value: string) => void;
};

export const Header = ({ onSearch }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const timeOut = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      setSearchValue(inputValue);
    }, 500);
  }, [inputValue]);

  React.useEffect(() => {
    onSearch(searchValue);
  }, [searchValue]);

  return (
    <header className="header">
      <section className="logo-search">
        <img className="logo" src={MyUnsplashLogo} alt="My unsplash logo" />
        <section className="search">
          <span className="search__icon material-icons">search</span>
          <input
            className="search__input"
            type="text"
            placeholder="Search by name"
            onChange={e => setInputValue(e.target.value)}
          />
        </section>
      </section>
      <ModalsContainer isModalOpen={isModalOpen}>
        <AddPhoto setIsModalOpen={setIsModalOpen} />
      </ModalsContainer>
      <button
        className="add-btn"
        type="button"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        <span className="add-btn__text">Add a photo</span>
        <span className="add-btn__icon">+</span>
      </button>
    </header>
  );
};
