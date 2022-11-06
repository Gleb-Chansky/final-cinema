import * as types from "./actionTypes";

const searchDataStart = () => ({
  type: types.SEARCH_DATA_START,
});

const searchDataSucces = (payload) => ({
  type: types.SEARCH_DATA_SUCCESS,
  payload,
});

const searchDataError = () => ({
  type: types.SEARCH_DATA_ERROR,
});

export const toggleBlur = (payload) => ({
  type: types.TOGGLE_BLUR,
  payload,
});

export const handleInput = (payload) => ({
  type: types.HANDLE_INPUT,
  payload,
});

export const toggleBurgerMenu = (payload) => ({
  type: types.TOGGLE_BURGER_MENU,
  payload,
});

export const makeWindowStiky = (payload) => ({
  type: types.MAKE_WINDOW_STIKY,
  payload,
});

export const fetchSearchData = (url, value) => {
  return async (dispatch) => {
    dispatch(searchDataStart());
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      dispatch(searchDataSucces(data));
    } else {
      dispatch(searchDataError());
    }
  };
};
