import { ImageLoader } from "@app/components/common";
import { getCSSVar, getYear } from "@app/helpers";
import { IMovieData } from "@app/types/types";
import moment from "moment";
import React from "react";
import { HiStar } from "react-icons/hi";
// @ts-ignore
import LazyLoad from "react-lazy-load";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

interface IProps {
  movie: IMovieData | null;
  category: "movie" | "tv";
  isLoading: boolean;
}

const MovieCard: React.FC<IProps> = ({ movie, category, isLoading }) => {
  const tmdbPosterPath = "https://image.tmdb.org/t/p/w185_and_h278_face/";

  const onClickCard = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // prevent clicking of movie cards if loading
    if (isLoading) {
      e.preventDefault();
    }
  };

  return (
    <SkeletonTheme
      color={getCSSVar("--skeleton-theme-color")}
      highlightColor={getCSSVar("--skeleton-theme-highlight")}
    >
      <div className="card">
        <div className="card__rating">
          <HiStar className="card__rating-star" />
          <h4 className="card__rating-vote">
            {movie?.vote_average?.toFixed(1)}
          </h4>
        </div>
        <Link to={`/view/${category}/${movie?.id}`} onClick={onClickCard}>
          <div className="card__image">
            {movie ? (
              <LazyLoad debounce={false} offsetVertical={500}>
                <ImageLoader
                  alt={
                    movie.original_title || movie.original_name || movie.title
                  }
                  imgId={movie.id}
                  src={
                    movie.poster_path
                      ? `${tmdbPosterPath + movie.poster_path}`
                      : "/img-placeholder.jpg"
                  }
                />
              </LazyLoad>
            ) : (
              <Skeleton width={"100%"} height={"100%"} />
            )}
          </div>
        </Link>
        <div className="card__details">
          <h4>
            {movie ? (
              movie.original_title ||
              movie.original_name ||
              movie.title ||
              "Not Available"
            ) : (
              <Skeleton width={"80%"} height={15} />
            )}
          </h4>
          <div className="card__footer">
            <p>
              Release :{" "}
              {movie ? (
                moment(movie.release_date).format("DD MMM YYYY") ||
                moment(movie.first_air_date).format("DD MMM YYYY") ||
                "N/A"
              ) : (
                <Skeleton width={50} />
              )}
            </p>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default MovieCard;
