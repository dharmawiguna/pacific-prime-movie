import {
  FETCH_MAIN_MOVIES_SUCCESS,
  FETCH_POPULAR_MOVIES_SUCCESS,
  FETCH_SELECTED_MOVIE_SUCCESS,
} from "@app/constants/actionType";
import { IMovieState } from "@app/types/types";
import { TMovieActionType } from "../actions/movieActions";

const defaultState: IMovieState = {
  current: {
    movie: null,
    keywords: [],
    casts: [],
    reviews: [],
  },
  popular: null,
};

const moviesReducer = (state = defaultState, action: TMovieActionType) => {
  switch (action.type) {
    case FETCH_SELECTED_MOVIE_SUCCESS:
      return {
        ...state,
        current: action.payload,
      };
    case FETCH_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        popular: action.payload,
      };
    case FETCH_MAIN_MOVIES_SUCCESS:
      return {
        ...state,
        upcoming: action.payload.upcoming,
        topRated: action.payload.topRated,
        popular: action.payload.popular,
      };
    default:
      return state;
  }
};

export default moviesReducer;
