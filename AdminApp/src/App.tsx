import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Tables from './pages/Tables';
import Association from './pages/Association';
import Jurys from './pages/Jurys';
import Users from './pages/Users';
import Jury from './pages/Jury';

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
        <Route path="/association" element={<Association />} />
        <Route path="/associations" element={<Tables />} />
        <Route path="/jurys" element={<Jurys />} />
        <Route path="/jury" element={<Jury />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addjury" element={<FormLayout />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
