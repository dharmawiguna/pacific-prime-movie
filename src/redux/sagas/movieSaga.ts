import {
  FETCH_MAIN_MOVIES,
  FETCH_POPULAR_MOVIES,
  FETCH_SELECTED_MOVIE,
} from "@app/constants/actionType";
import {
  getMovieCredits,
  getMovieKeywords,
  getMovieReviews,
  getPopularMovies,
  getSelectedMovie,
} from "@app/services/api";
import { all, call, put } from "redux-saga/effects";
import { setLoading } from "../actions/miscActions";
import {
  fetchMainMoviesSuccess,
  fetchPopularMoviesSuccess,
  fetchSelectedMoviesSuccess,
} from "../actions/movieActions";

interface ISagaArgs {
  type: any;
  payload: any;
}

export function* movieSaga({ type, payload }: ISagaArgs): any {
  switch (type) {
    case FETCH_POPULAR_MOVIES: {
      try {
        yield put(setLoading(true));

        const movies = yield call(getPopularMovies, payload.page);
        yield put(fetchPopularMoviesSuccess(movies));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case FETCH_MAIN_MOVIES: {
      try {
        yield put(setLoading(true));
        const [popular, topRated, upcoming] = yield all([
          call(getPopularMovies, 1),
        ]);

        yield put(fetchMainMoviesSuccess({ popular, topRated, upcoming }));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case FETCH_SELECTED_MOVIE: {
      try {
        yield put(setLoading(true));
        const { mediaType, id } = payload;
        const [movie, keywords, casts, reviews] = yield all([
          call(getSelectedMovie, mediaType, id),
          call(getMovieKeywords, mediaType, id),
          call(getMovieCredits, mediaType, id),
          call(getMovieReviews, mediaType, id),
        ]);

        yield put(
          fetchSelectedMoviesSuccess({
            movie,
            keywords: keywords.keywords,
            casts: casts.cast,
            reviews: reviews.results,
          })
        );
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    default:
      throw new Error("Unexpected action type");
  }
}
