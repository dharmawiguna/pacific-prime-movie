import PeopleList from "@app/components/main/People/PeopleList";
import { IRootState } from "@app/types/types";
import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const MovieCast = () => {
  const casts = useSelector((state: IRootState) => state.movies.current.casts);

  return (
    <div className="movie__casts">
      <div className="container__wrapper movie__casts-content">
        <div className="movie__casts-wrapper">
          <div className="movie__casts-header header__title">
            <h1>Top Billed Casts</h1>
          </div>
          <br />
          <PeopleList
            people={casts.slice(0, 12)}
            gridClass="movie__casts-grid"
          />
          <br />
          <br />
          {casts.length < 1 && (
            <p style={{ opacity: ".7", fontStyle: "italic" }}>
              No casts found for this movie.
            </p>
          )}
        </div>
        <MovieDetails />
      </div>
    </div>
  );
};

export default withRouter(MovieCast);
