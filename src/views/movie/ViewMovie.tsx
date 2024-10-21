import { MovieCast, MovieOverview } from "@app/components/main";
import { useDidMount, useDocumentTitle } from "@app/hooks";
import { fetchSelectedMovie } from "@app/redux/actions";
import { IRootState, TMediaType } from "@app/types/types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";

type RouteParams = RouteComponentProps<{ id: string; category: TMediaType }>;

const ViewMovie: React.FC<RouteParams> = ({ history, match }) => {
  const { movie, reviews, isLoading } = useSelector((state: IRootState) => ({
    movie: state.movies.current.movie,
    reviews: state.movies.current.reviews,
    isLoading: state.misc.isLoading,
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const posters = movie?.images?.posters || [];

  useDocumentTitle(
    movie?.id
      ? `${movie.original_name || movie.original_title} | PACIFIC PRIME`
      : "View Movie | PACIFIC PRIME"
  );
  useEffect(() => {
    const movieId = match.params.id;
    fetchMovie(movieId);
  }, []);

  useEffect(() => {
    if (didMount || !movie) {
      fetchMovie(match.params.id);
    }
  }, [match.params.id]);

  const fetchMovie = (id: string) => {
    if (parseInt(id, 10) !== movie?.id) {
      dispatch(fetchSelectedMovie(match.params.category, id));
    }
  };

  const onClickViewImage = () => {
    history.push(`/view/movie/${match.params.id}/images`);
  };

  return !isLoading ? (
    <>
      <MovieOverview />
      <MovieCast />
    </>
  ) : (
    <MovieOverview />
  );
};

export default ViewMovie;
