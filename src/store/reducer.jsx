import * as types from "./actionTypes";

const initialState = {
  films: [],
  actors: [],
  value: "",
  isLoading: false,
  isError: false,
  isBlur: false,
  isBurgerMenuVisible: false,
  isWidowsStiky: true,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_BLUR: {
      return {
        ...state,
        isBlur: action.payload,
        isWindowStiky: action.payload,
      };
    }
    case types.HANDLE_INPUT: {
      return {
        ...state,
        value: action.payload,
      };
    }
    case types.TOGGLE_BURGER_MENU: {
      return {
        ...state,
        isBurgerMenuVisible: action.payload,
        isWindowStiky: action.payload,
      };
    }
    case types.MAKE_WINDOW_STIKY: {
      return {
        ...state,
        isWindowStiky: action.payload,
      };
    }
    case types.SEARCH_DATA_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.SEARCH_DATA_SUCCESS: {
      return {
        ...state,
        films: action.payload[0],
        actors: action.payload[1],
        isLoading: false,
      };
    }
    case types.SEARCH_DATA_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};
