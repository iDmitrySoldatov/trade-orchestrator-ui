import styles from './back-tests-page.module.css';
import AppHeader from '../../components/app-header/AppHeader.tsx';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks.ts';
import {
  fetchGetBackTestParams,
  fetchGetTimeframes,
} from '../../slices/enumSlice.ts';
import ActiveButton from '../../components/buttons/active-button/ActiveButton.tsx';
import FilterWall from '../../components/filter-wall/FilterWall.tsx';
import Dropdown from '../../components/inputs/dropdown/Dropdown.tsx';
import { STATS_FIELDS } from '../../utils/constants.ts';
import { backTestsSlice, fetchReports } from '../../slices/backTestsSlice.ts';
import ReportItem from '../../components/report-item/ReportItem.tsx';
import PageSelector from '../../components/page-selector/PageSelector.tsx';
import Modal from '../../components/modal/Modal.tsx';
import ReportDetails from '../../components/report-details/ReportDetails.tsx';
import { IReport } from '../../utils/types.ts';
import StartForm from '../../components/forms/start-form/StartForm.tsx';

const BackTestsPage = () => {
  const dispatch = useAppDispatch();

  const { timeframes, backTestParams } = useAppSelector((state) => state.enum);

  const { filter, reports, showDetails, showStart } = useAppSelector(
    (state) => state.backTests
  );

  const [orderBy, setOrderBy] = useState<string>(filter.orderBy);

  const [currentPage, setCurrentPage] = useState<number>(filter.page);

  useEffect(() => {
    dispatch(fetchGetTimeframes());
    dispatch(fetchGetBackTestParams());
  }, []);

  useEffect(() => {
    dispatch(fetchReports(filter));
  }, [filter]);

  const handleSetOrderBy = (orderBy: string) => {
    setOrderBy(orderBy);
    dispatch(backTestsSlice.actions.setFilter({ ...filter, orderBy: orderBy }));
  };

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
    dispatch(backTestsSlice.actions.setFilter({ ...filter, page: page }));
  };

  const handleCloseDetails = () => {
    dispatch(backTestsSlice.actions.setShowDetails(false));
  };

  const handleCloseStart = () => {
    dispatch(backTestsSlice.actions.setShowStart(false));
  };

  const handleShowDetails = (report: IReport) => {
    dispatch(backTestsSlice.actions.setCurrentReport(report));
    dispatch(backTestsSlice.actions.setShowDetails(true));
  };

  const handleShowStart = () => {
    dispatch(backTestsSlice.actions.setShowStart(true));
  };

  if (timeframes.length < 0 || backTestParams.length < 0) return null;

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <div className={styles.filter_container}>
          <FilterWall />
        </div>

        <div className={styles.content_container}>
          <div className={styles.content_header}>
            <div className={styles.sorting_container}>
              <p>сортировка: </p>
              <Dropdown
                options={STATS_FIELDS.map((current) => current)}
                selected={orderBy}
                onChange={handleSetOrderBy}
              />
            </div>
            <PageSelector
              current={currentPage}
              total={reports.totalPages}
              setCurrent={handleSetCurrentPage}
            />
            <ActiveButton onClick={handleShowStart}>
              Запустить тест
            </ActiveButton>
          </div>

          <div className={styles.report_container}>
            {reports.reports.map((report, index) => (
              <ReportItem
                data={report}
                onClick={handleShowDetails}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>

      {showDetails && (
        <Modal onClose={handleCloseDetails}>
          <ReportDetails />
        </Modal>
      )}

      {showStart && (
        <Modal onClose={handleCloseStart}>
          <StartForm />
        </Modal>
      )}
    </>
  );
};

export default BackTestsPage;
