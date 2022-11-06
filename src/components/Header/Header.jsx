import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../Search";
import { toggleBlur } from "../../store/actions";
import { handleInput } from "../../store/actions";
import { toggleBurgerMenu } from "../../store/actions";
import { useWindowDimensions } from "../WidthHook";
import { LinkList } from "./LinkList";
import Burger from "../../img/burger.svg";

export const Header = () => {
  const dispatch = useDispatch();
  const isBurgerMenuVisible = useSelector((state) => state.isBurgerMenuVisible);
  const isBlur = useSelector((state) => state.isBlur);
  const { width } = useWindowDimensions();

  const handleSearch = () => {
    dispatch(toggleBlur(false));
    dispatch(toggleBurgerMenu(false));
    dispatch(handleInput(""));
  };

  const openBurgerMenu = () => {
    dispatch(toggleBurgerMenu(true));
  };

  const closeBurgerMenu = () => {
    dispatch(toggleBurgerMenu(false));
  };

  return (
    <>
      <header className="header">
        <div className="header__wrapper container">
          <Link to="/" className="header__logo" onClick={handleSearch}>
            online-cinema
          </Link>
          <div className="header__inner">
            <>
              {width > 900 ? (
                <nav className="header__navigation">
                  <LinkList />
                </nav>
              ) : (
                <nav
                  className={
                    isBurgerMenuVisible === true
                      ? "header__navigation visible"
                      : "header__navigation invisible"
                  }
                >
                  <LinkList />
                </nav>
              )}
            </>
            <div className="header__search-wrapper">
              {isBurgerMenuVisible === false ? (
                <>
                  <Search />
                  <img
                    src={Burger}
                    alt="logo"
                    className={
                      isBlur === true
                        ? "header__burger invisible"
                        : "header__burger"
                    }
                    onClick={openBurgerMenu}
                  />
                </>
              ) : (
                <button
                  className="header__search-close"
                  onClick={closeBurgerMenu}
                >
                  X
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
