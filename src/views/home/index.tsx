import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SplashScreen from "../../components/common/SplashScreen/SplashScreen";
import MovieTable from "../../components/home/DataTable/DataTable";
import Filter from "../../components/home/Filter/Filter";
import Header from "../../components/home/Header/Header";
import SearchButton from "../../components/home/SearchButton/SearchButton";
import { SearchResult } from "../../interfaces/redux-actions";
import { fetchData } from "../../redux/actions/categorySlice";
import { RootState } from "../../redux/reducers";
import { AppDispatch } from "../../redux/store/store";

import "./index.scss";

const Home: FC = () => {
  const apiData = useSelector((state: RootState) => state.api.apiData);
  const loading = useSelector((state: RootState) => state.api.loading);
  const error = useSelector((state: RootState) => state.api.error);

  const [page, setPage] = useState<number>(1);
  const [title, setTitle] = useState<string>("Pokemon");
  const [year, setYear] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  /**
   * Fetch data on page load.
   * Currently fetching data for Pokemon.
   */
  useEffect(() => {
    dispatch(
      fetchData({
        title: "Pokemon",
        page: 1,
      })
    );
  }, [dispatch]);

  /**
   * Fetch data on search button click and reset page to 1.
   *
   * @returns void
   */
  const handleSearchButtonClick = () => {
    setPage(1);

    dispatch(
      fetchData({
        title: title,
        page: 1,
        year: Number(year),
      })
    );
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
   * Handle pagination change.
   * Fetch data for new page.
   *
   * @param newPage
   * @returns void
   */
  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    dispatch(
      fetchData({
        title: title,
        page: newPage,
        year: Number(year),
      })
    );
  };

  /**
   * Handle row click.
   */
  const handleRowClick = (row: SearchResult[]) => {
    console.log(row);
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
        <SearchButton onClickHandler={handleSearchButtonClick} />
      </div>

      {loading && <SplashScreen />}

      <>
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
      </>
    </div>
  );
};

export default Home;
