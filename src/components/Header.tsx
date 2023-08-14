import React from "react";
import "./Header.css";
import MyUnsplashLogo from "../assets/my_unsplash_logo.svg";
import { AddPhoto } from "../modals/AddPhoto";
import { ModalsContainer } from "../modals/ModalsContainer";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
          />
        </section>
      </section>
      <ModalsContainer isModalOpen={isModalOpen}>
        <AddPhoto setIsModalOpen={setIsModalOpen} />
      </ModalsContainer>
      <button
        className="header__add-btn"
        type="button"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        Add a photo
      </button>
    </header>
  );
};
