import styles from './backtests-page.module.css';
import AppHeader from "../../components/app-header/AppHeader.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../services/hooks.ts";
import {fetchGetBacktestparams, fetchGetTimeframes} from "../../slices/enumSlice.ts";
import ActiveButton from "../../components/buttons/active-button/ActiveButton.tsx";
import FilterWall from "../../components/filter-wall/FilterWall.tsx";

const BacktestsPage = () => {
  const dispatch = useAppDispatch();

  const {timeframes, backtestparams} = useAppSelector(state => state.enum);

  const {items} = useAppSelector(state => state.instrument);

  const {filter, reports} = useAppSelector(state => state.backtests);

  useEffect(() => {
    dispatch(fetchGetTimeframes());
    dispatch(fetchGetBacktestparams());
  }, []);

  if ((timeframes.length < 0) || (backtestparams.length < 0)) return null;

  return (
      <>
        <AppHeader/>
        <div className={styles.container}>
          <div className={styles.filter_container}>
            <FilterWall />
          </div>

          <div className={styles.content_container}>
            <div className={styles.content_header}>
              <div>сортировка по</div>
              <ActiveButton>Запустить тест</ActiveButton>
            </div>

            <div className={styles.report_container}>
              отчеты
            </div>
          </div>
        </div>
      </>

  );
};

export default BacktestsPage;