import React from "react";
import "./Header.css";
import MyUnsplashLogo from "../assets/my_unsplash_logo.svg";
import { AddPhoto } from "../modals/AddPhoto";
import { ModalsContainer } from "../modals/ModalsContainer";
import { AppContext, AppContextType } from "../context/AppContext";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const timeOut = React.useRef<NodeJS.Timeout>();
  const { setLabelToSearch }: AppContextType = React.useContext(
    AppContext
  ) as unknown as AppContextType;

  React.useEffect(() => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      setLabelToSearch(inputValue);
    }, 500);
  }, [inputValue]);

  const toggleDarkMode = () => {
    const body = document.querySelector("body");
    body?.classList.toggle("dark-mode");
  };

  return (
    <header className="header">
      <section className="logo-search">
        <img className="logo" src={MyUnsplashLogo} alt="My unsplash logo" onClick={toggleDarkMode} />
        <section className="search">
          <span className="search__icon material-icons">search</span>
          <input
            className="search__input"
            type="text"
            placeholder="Search by name"
            onChange={(e) => setInputValue(e.target.value)}
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
