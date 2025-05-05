import styles from './instrument-page.module.css';
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../services/hooks.ts";
import {fetchAddSymbol, fetchGetAll, instrumentSlice} from "../../slices/instrumentSlice.ts";
import AppHeader from "../../components/app-header/AppHeader.tsx";
import InstrumentItem from "../../components/instrument-item/InstrumentItem.tsx";
import {Exchange} from "../../utils/types.ts";
import Modal from "../../components/modal/Modal.tsx";
import InstrumentForm from "../../components/intrument-form/InstrumentForm.tsx";
import ActiveButton from "../../components/buttons/active-button/ActiveButton.tsx";

const InstrumentPage = () => {

  const { items, isAddModalOpen } = useAppSelector(state => state.instrument);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetAll());
  }, [])

  const handleAddClick = () => {
    dispatch(instrumentSlice.actions.setAddModal(true));
  }

  const handleSubmit = (exchange:Exchange, symbol:string) => {
    dispatch(fetchAddSymbol({exchange: exchange, symbol: symbol}))
        .then(() => dispatch(fetchGetAll()));
  }

  const handleClose = () => {
    dispatch(instrumentSlice.actions.setAddModal(false));
    dispatch(instrumentSlice.actions.resetError());
  }

  return (
      <>
        <AppHeader/>
        <div className={styles.container}>
          <div className={styles.top_line}>
            <h1>Инструмент</h1>
            <ActiveButton onClick={handleAddClick}>Добавить</ActiveButton>
          </div>

          <div className={styles.content}>
            <div className={styles.head}>
              <p className={styles.name}>Название</p>
              <p className={styles.exchange}>Биржа</p>
              <p className={styles.step}>Минимальный шаг</p>
              <p className={styles.price}>Стоимость пункта</p>
            </div>

            {items.map((item, index) => (
                <InstrumentItem data={item} key={index}/>
            ))}
          </div>

        </div>

        {isAddModalOpen && <Modal onClose={handleClose}>
          <InstrumentForm onSubmit={handleSubmit} onClose={handleClose}/>
        </Modal>}
      </>
  );
};

export default InstrumentPage;