import './Header.css';
import MyUnsplashLogo from "../assets/my_unsplash_logo.svg";

export const Header = () => {
  return (
    <header className='header'>
      <section className='logo-search'>
        <img className='logo' src={MyUnsplashLogo} alt="My unsplash logo" />
        <section className="search">
          <span className="search__icon material-icons">search</span>
          <input className='search__input' type="text" placeholder="Search by name" />
        </section>
      </section>
      <button className='header__add-btn' type="button">Add a photo</button>
    </header>
  );
};
