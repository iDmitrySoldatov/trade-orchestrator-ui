import './reset.css';
import {Route, Routes} from "react-router-dom";
import InstrumentPage from "./pages/instrument-page/InstrumentPage.tsx";
import BacktestsPage from "./pages/backtests-page/BacktestsPage.tsx";
import ProtectedRouteComponent from "./components/protected-route-component/ProtectedRouteComponent.tsx";
import LoginPage from "./pages/login-page/LoginPage.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "./services/hooks.ts";
import {fetchCheck} from "./slices/userSlice.ts";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCheck());
  }, []);

  return (
      <>
        <Routes>
          <Route path="/instrument" element={<ProtectedRouteComponent element={<InstrumentPage/>}/>}/>
          <Route path="/backtests" element={<ProtectedRouteComponent element={<BacktestsPage/>}/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="*" element={<ProtectedRouteComponent element={<InstrumentPage/>}/>}/>
        </Routes>
      </>
  );
}

export default App;
