import './reset.css';
import { Route, Routes } from 'react-router-dom';
import InstrumentPage from './pages/instrument-page/InstrumentPage.tsx';
import BackTestsPage from './pages/back-tests-page/BackTestsPage.tsx';
import ProtectedRouteComponent from './components/protected-route-component/ProtectedRouteComponent.tsx';
import LoginPage from './pages/login-page/LoginPage.tsx';
import { useEffect } from 'react';
import { useAppDispatch } from './services/hooks.ts';
import { fetchCheck } from './slices/userSlice.ts';
import StrategyPage from './pages/strategy-page/StrategyPage.tsx';
import ArchivePage from './pages/archive-page/ArchivePage.tsx';
import ProfilePage from './pages/profile-page/ProfilePage.tsx';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCheck());
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/instrument"
          element={<ProtectedRouteComponent element={<InstrumentPage />} />}
        />
        <Route
          path="/backtests"
          element={<ProtectedRouteComponent element={<BackTestsPage />} />}
        />
        <Route
          path="/strategy"
          element={<ProtectedRouteComponent element={<StrategyPage />} />}
        />
        <Route
          path="/archive"
          element={<ProtectedRouteComponent element={<ArchivePage />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRouteComponent element={<ProfilePage />} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={<ProtectedRouteComponent element={<InstrumentPage />} />}
        />
      </Routes>
    </>
  );
}

export default App;
