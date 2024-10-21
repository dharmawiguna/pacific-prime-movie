import * as action from "@app/constants/actionType";
import {
  ICast,
  IKeyword,
  IMovieData,
  IResponse,
  IReview,
  TMediaType,
} from "@app/types/types";

type IMovieResponse = IResponse<IMovieData[]>;

export const fetchPopularMovies = (page = 1) =>
  <const>{
    type: action.FETCH_POPULAR_MOVIES,
    payload: { page },
  };

export const fetchMainMovies = () =>
  <const>{
    type: action.FETCH_MAIN_MOVIES,
  };

export const fetchSelectedMovie = (mediaType: TMediaType, id: string) =>
  <const>{
    type: action.FETCH_SELECTED_MOVIE,
    payload: {
      mediaType,
      id,
    },
  };

interface TSelectedMovieParams {
  movie: IMovieData;
  casts: ICast[];
  keywords: IKeyword[];
  reviews: IReview[];
}

export const fetchSelectedMoviesSuccess = (data: TSelectedMovieParams) =>
  <const>{
    type: action.FETCH_SELECTED_MOVIE_SUCCESS,
    payload: data,
  };

export const fetchPopularMoviesSuccess = (data: IMovieResponse) =>
  <const>{
    type: action.FETCH_POPULAR_MOVIES_SUCCESS,
    payload: data,
  };

interface IMainMoviesParams {
  upcoming: IMovieResponse;
  topRated: IMovieResponse;
  popular: IMovieResponse;
}

export const fetchMainMoviesSuccess = (data: IMainMoviesParams) =>
  <const>{
    type: action.FETCH_MAIN_MOVIES_SUCCESS,
    payload: data,
  };

export type TMovieActionType =
  | ReturnType<typeof fetchPopularMovies>
  | ReturnType<typeof fetchMainMovies>
  | ReturnType<typeof fetchSelectedMovie>
  | ReturnType<typeof fetchSelectedMoviesSuccess>
  | ReturnType<typeof fetchPopularMoviesSuccess>
  | ReturnType<typeof fetchMainMoviesSuccess>;
