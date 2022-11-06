import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loupe from "../img/loupe.svg";
import { toggleBlur } from "../store/actions";
import { fetchSearchData } from "../store/actions";
import { useWindowDimensions } from "./WidthHook";
import { handleInput } from "../store/actions";

export const Search = () => {
  const dispatch = useDispatch();
  const isBlur = useSelector((state) => state.isBlur);
  const inputRef = useRef(null);
  const value = useSelector((state) => state.value);
  const { width } = useWindowDimensions();

  const openSearchMenu = () => {
    dispatch(toggleBlur(true));
  };

  const closeSearchMenu = () => {
    dispatch(toggleBlur(false));
    dispatch(handleInput(""));
  };

  const handleChange = (event) => {
    dispatch(handleInput(event.target.value));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [isBlur]);

  useEffect(() => {
    dispatch(fetchSearchData("/search", value));
  }, [value]);

  return (
    <div className="header__search">
      <input
        onChange={() => handleChange(event)}
        ref={inputRef}
        value={value}
        className={
          isBlur === true ? "header__search-input visible" : "invisible"
        }
        type="text"
        placeholder={
          width > 500
            ? "The name of the movie, cartoon or actor's name"
            : "Search"
        }
      />
      <img
        className={isBlur === false ? "header__search-logo" : "invisible"}
        src={Loupe}
        alt="loupe"
        onClick={openSearchMenu}
      />
      <button
        onClick={closeSearchMenu}
        className={
          isBlur === true ? "header__search-close visible" : "invisible"
        }
      >
        X
      </button>
    </div>
  );
};
