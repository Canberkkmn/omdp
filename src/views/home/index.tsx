import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

import SplashScreen from "../../components/common/SplashScreen/SplashScreen";
import MovieTable from "../../components/home/DataTable/DataTable";
import Dropdown from "../../components/home/Dropdown/Dropdown";
import Filter from "../../components/home/Filter/Filter";
import Header from "../../components/home/Header/Header";
import SearchButton from "../../components/home/SearchButton/SearchButton";
import { SearchResult } from "../../interfaces/redux-actions";
import { fetchData } from "../../redux/actions/categorySlice";
import { RootState } from "../../redux/reducers";
import { AppDispatch } from "../../redux/store/store";

import "./index.scss";

interface ISearchParams extends URLSearchParams {
  size: number;
}

const Home: FC = () => {
  const apiData = useSelector((state: RootState) => state.api.apiData);
  const loading = useSelector((state: RootState) => state.api.loading);
  const error = useSelector((state: RootState) => state.api.error);

  // eslint-disable-next-line prefer-const
  let [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [title, setTitle] = useState<string>(
    searchParams.get("title") || "Pokemon"
  );
  const [year, setYear] = useState<string>(searchParams.get("year") || "");
  const [type, setType] = useState<string>(searchParams.get("type") || "");
  const [initialCheck, setInitialCheck] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
    setTitle(searchParams.get("title") || "Pokemon");
    setYear(searchParams.get("year") || "");
    setType(searchParams.get("type") || "");
  }, [location, searchParams]);

  /**
   * Fetch data on page load.
   * Currently fetching data for Pokemon.
   */
  useEffect(() => {
    if (initialCheck) {
      dispatch(
        fetchData({
          title: searchParams.get("title") || "Pokemon",
          page: Number(searchParams.get("page")) || 1,
          year: Number(searchParams.get("year")),
          type: searchParams.get("type") || "",
        })
      );

      setSearchParams({
        title: searchParams.get("title") || "Pokemon",
        page: searchParams.get("page") || "1",
        year: searchParams.get("year") || "",
        type: searchParams.get("type") || "",
      });

      setInitialCheck(false);
    }
  }, [dispatch, searchParams, setSearchParams, initialCheck]);

  /**
   * Fetch data on search params change.
   *
   * @returns void
   */
  useEffect(() => {
    if (!initialCheck && ((searchParams as ISearchParams).size as number) > 0) {
      dispatch(
        fetchData({
          title: searchParams.get("title") || "Pokemon",
          page: Number(searchParams.get("page")) || 1,
          year: Number(searchParams.get("year")),
          type: searchParams.get("type") || "",
        })
      );
    }
  }, [dispatch, initialCheck, searchParams]);

  /**
   * Fetch data on search button click and reset page to 1.
   *
   * @returns void
   */
  const handleSearchButtonClick = () => {
    setPage(1);

    setSearchParams({
      title: title.trim(),
      page: "1",
      year: year,
      type: type.trim(),
    });
  };

  /**
   * Handle textfield title change.
   *
   * @param newTitle
   * @returns void
   */
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  /**
   * Handle textfield year change.
   *
   * @param newYear
   * @returns void
   */
  const handleYearChange = (newYear: string) => {
    setYear(newYear);
  };

  /**
   * Handle dropdown change.
   *
   */
  const handleDropdownChange = (newType: string) => {
    setType(newType);
  };

  /**
   * Handle pagination change.
   * Fetch data for new page.
   *
   * @param newPage
   * @returns void
   */
  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    setSearchParams({
      title: title,
      page: newPage.toString(),
      year: year,
      type: type,
    });
  };

  /**
   * Handle row click.
   */
  const handleRowClick = (row: SearchResult) => {
    navigate(`/item/${row.id}`);
  };

  return (
    <div>
      <Header />

      <div className="filterWrapper">
        <Filter
          type="title"
          value={title}
          onChangeHandler={handleTitleChange}
        />
        <Filter type="year" value={year} onChangeHandler={handleYearChange} />
        <Dropdown value={type} onChangeHandler={handleDropdownChange} />
        <SearchButton onClickHandler={handleSearchButtonClick} />
      </div>

      {loading && <SplashScreen />}

      {error && <p>Error: {error}</p>}

      {apiData && (
        <>
          <MovieTable
            data={apiData}
            handlePageChange={handlePageChange}
            handleRowClick={handleRowClick}
            page={page}
          />
        </>
      )}
    </div>
  );
};

export default Home;
