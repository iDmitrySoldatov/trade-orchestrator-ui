import styles from './strategy-page.module.css';
import AppHeader from '../../components/app-header/AppHeader.tsx';
import StrategyItem from '../../components/strategy-item/StrategyItem.tsx';
import { useAppDispatch, useAppSelector } from '../../services/hooks.ts';
import { useEffect } from 'react';
import { fetchStrategies, strategySlice } from '../../slices/strategySlice.ts';
import ActiveButton from '../../components/buttons/active-button/ActiveButton.tsx';
import Modal from '../../components/modal/Modal.tsx';
import { IStrategy } from '../../utils/types.ts';
import StartStrategyForm from '../../components/forms/start-strategy-form/StartStrategyForm.tsx';
import { fetchGetTimeframes } from '../../slices/enumSlice.ts';
import StrategyDetails from '../../components/strategy-details/StrategyDetails.tsx';

const StrategyPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStrategies());
    dispatch(fetchGetTimeframes());
  }, []);

  const { strategies, showStart, showDetails } = useAppSelector(
    (state) => state.strategy
  );

  const handleCloseDetails = () => {
    dispatch(strategySlice.actions.setShowDetails(false));
  };

  const handleCloseStart = () => {
    dispatch(strategySlice.actions.setShowStart(false));
  };

  const handleShowDetails = (strategy: IStrategy) => {
    dispatch(strategySlice.actions.setCurrentStrategy(strategy));
    dispatch(strategySlice.actions.setShowDetails(true));
  };

  const handleShowStart = () => {
    dispatch(strategySlice.actions.setShowStart(true));
  };

  const handleUpdateClick = () => {
    dispatch(fetchStrategies());
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <div className={styles.content_header}>
          <ActiveButton onClick={handleUpdateClick}>Обновить</ActiveButton>

          <ActiveButton onClick={handleShowStart}>
            Запустить стратегию
          </ActiveButton>
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

      {showStart && (
        <Modal onClose={handleCloseStart}>
          <StartStrategyForm />
        </Modal>
      )}
    </>
  );
};

export default StrategyPage;
