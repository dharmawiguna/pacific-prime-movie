import { Footer, Navigation } from "@app/components/common";
import withProgress from "@app/components/hoc/withProgress";
import * as route from "@app/constants/routes";
import * as view from "@app/views";
import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <>
      <ToastContainer
        autoClose={3000}
        bodyClassName="toast-body"
        limit={1}
        newestOnTop={true}
        pauseOnHover={false}
        position={window.screen.width <= 480 ? "bottom-right" : "top-right"}
        progressStyle={{ backgroundColor: "yellow" }}
        toastClassName="toast"
        transition={Slide}
      />
      <Navigation />

      <main id="main">
        <Switch>
          <Route
            component={withProgress(view.Home)}
            exact={true}
            path={route.HOME}
          />
          <Route
            component={withProgress(view.PopularMovies)}
            exact={true}
            path={route.POPULAR}
          />
          <Route
            component={withProgress(view.ViewMovie)}
            exact={true}
            path={route.VIEW_MOVIE}
          />
          <Route
            component={withProgress(view.Search)}
            exact={true}
            path={route.SEARCH}
          />
          <Route
            component={withProgress(view.MoviePosters)}
            exact={true}
            path={route.VIEW_MOVIE_POSTER}
          />
          <Route
            component={withProgress(view.MovieCasts)}
            exact={true}
            path={route.VIEW_MOVIE_CASTS}
          />
          <Route
            component={view.NetworkError}
            exact={true}
            path={route.NETWORK_ERROR}
          />
          <Route component={view.PageError} exact={true} path={route.ERROR} />
          <Route component={view.PageNotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  </Router>
);

export default AppRouter;
