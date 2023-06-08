import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Tables from './pages/Tables';
import Users from './pages/Users';
import Association from './pages/Association';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<ECommerce />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/association" element={<Association />} />
        <Route path="/users" element={<Users />} />
        <Route path="/associations" element={<Tables />} />
        <Route path="/auth/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
