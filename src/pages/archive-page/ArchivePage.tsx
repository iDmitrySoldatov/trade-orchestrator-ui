import styles from './archive-page.module.css';
import { useAppDispatch, useAppSelector } from '../../services/hooks.ts';
import { useEffect } from 'react';
import { fetchGetTimeframes } from '../../slices/enumSlice.ts';
import { fetchGetAllInstrument } from '../../slices/instrumentSlice.ts';
import { IStrategy } from '../../utils/types.ts';
import AppHeader from '../../components/app-header/AppHeader.tsx';
import ActiveButton from '../../components/buttons/active-button/ActiveButton.tsx';
import StrategyItem from '../../components/strategy-item/StrategyItem.tsx';
import Modal from '../../components/modal/Modal.tsx';
import StrategyDetails from '../../components/strategy-details/StrategyDetails.tsx';
import { fetchArchiveStrategies } from '../../slices/archiveSlice.ts';
import { strategySlice } from '../../slices/strategySlice.ts';

const ArchivePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetTimeframes());
    dispatch(fetchGetAllInstrument());
    dispatch(fetchArchiveStrategies());

    const intervalId = setInterval(() => {
      dispatch(fetchArchiveStrategies());
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const { strategies } = useAppSelector((state) => state.archive);

  const { showDetails } = useAppSelector((state) => state.strategy);

  const handleCloseDetails = () => {
    dispatch(strategySlice.actions.setShowDetails(false));
  };

  const handleShowDetails = (strategy: IStrategy) => {
    dispatch(strategySlice.actions.setCurrentStrategy(strategy));
    dispatch(strategySlice.actions.setShowDetails(true));
  };

  const handleUpdateClick = () => {
    dispatch(fetchArchiveStrategies());
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <div className={styles.content_header}>
          <ActiveButton onClick={handleUpdateClick}>Обновить</ActiveButton>
        </div>

        <div className={styles.strategy_container}>
          {strategies.map((strategy, index) => (
            <StrategyItem
              data={strategy}
              onClick={handleShowDetails}
              key={index}
            />
          ))}
        </div>
      </div>

      {showDetails && (
        <Modal onClose={handleCloseDetails}>
          <StrategyDetails />
        </Modal>
      )}
    </>
  );
};

export default ArchivePage;
