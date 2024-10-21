import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useDidMount from "./useDidMount";

const usePageSaver = (path?: string) => {
  const { pathname } = useLocation();
  const p = path || pathname.replace("/", "");
  const [currentPage, setCurrentPage] = useState(() =>
    localStorage.moviePage ? JSON.parse(localStorage.moviePage)[p] : 1
  );
  const didMount = useDidMount();

  useLayoutEffect(() => {
    const storageItem = localStorage.getItem("moviePage");

    if (storageItem) {
      const moviePage = JSON.parse(storageItem);
      const page = moviePage[p];

      if (typeof moviePage[p] !== undefined) {
        setCurrentPage(page);
      }
    } else {
      localStorage.setItem(
        "moviePage",
        JSON.stringify({
          [p]: currentPage,
        })
      );
    }
  }, []);

  useEffect(() => {
    const storageItem = localStorage.getItem("moviePage");

    if (didMount && storageItem) {
      const moviePage = JSON.parse(storageItem);

      localStorage.setItem(
        "moviePage",
        JSON.stringify({
          ...moviePage,
          [p]: currentPage,
        })
      );
    }
  }, [currentPage]);

  return { currentPage, setCurrentPage };
};

export default usePageSaver;
