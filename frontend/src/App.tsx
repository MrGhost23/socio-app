import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorPage from './pages/ErrorPage';

import Register from './pages/Register';
import LogIn from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<LogIn />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
      </Routes>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        progressStyle={{ backgroundColor: '#D9083A' }}
      />
    </>
  );
};
  
  export default App;