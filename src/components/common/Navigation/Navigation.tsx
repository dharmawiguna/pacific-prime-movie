/* eslint-disable react/jsx-boolean-value */
import { TopProgressLoader } from "@app/components/common";
import * as route from "@app/constants/routes";
import React, { useEffect, useState } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import Searchbar from "./Searchbar";

const Navigation = () => {
  const [isOpenNavigation, setOpenNavigation] = useState(false);
  const [isOpenSearchForMobile, setOpenSearchMobile] = useState(false);

  useEffect(() => {
    if (window.screen.width > 768) {
      window.addEventListener("scroll", scrollHandler);
    }
    return () => window.removeEventListener("scroll", scrollHandler);
  });

  const onNavigationToggle = () => {
    document.body.classList.toggle("is-navigation-open");
    document.body.classList.remove("is-search-open");
    setOpenNavigation(!isOpenNavigation);
  };

  const onSearchToggle = () => {
    document.body.classList.toggle("is-search-open");
    document.body.classList.remove("is-navigation-open");
    setOpenSearchMobile(true);
    setOpenNavigation(false);
  };

  const onClickLink = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).nodeName === "A") {
      document.body.classList.remove("is-navigation-open");
      setOpenNavigation(false);
      setOpenSearchMobile(false);
      window.scrollTo(0, 0);
    }
  };

  const closeSearchForMobile = () => {
    setOpenSearchMobile(false);
  };

  const scrollHandler = () => {
    if (window.pageYOffset > 100) {
      document.body.classList.add("is-scrolled");
    } else {
      document.body.classList.remove("is-scrolled");
    }
  };

  return (
    <>
      <TopProgressLoader />
      <div className="navigation" onClick={onClickLink}>
        <div className="navigation__wrapper">
          <button className="navigation__toggle" onClick={onNavigationToggle}>
            <i className={`fa fa-${isOpenNavigation ? "times" : "bars"}`} />
          </button>
          <div className="navigation__logo">
            <Link to={route.HOME}>
              <img src="/logo-movie.png" alt="" />
            </Link>
          </div>
          <div className="navigation__menu-wrapper">
            <div className="navigation__menu">
              {/* <ThemeToggler toggleId="themeSwitchNav" /> */}
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to={route.HOME}
              >
                Home
              </NavLink>
            </div>
            <Searchbar closeSearchForMobile={closeSearchForMobile} />
          </div>
          <button
            className="search__toggle button--icon"
            onClick={onSearchToggle}
          >
            <i
              className={`fa fa-${isOpenSearchForMobile ? "times" : "search"}`}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default withRouter(Navigation);
