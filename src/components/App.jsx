import Router from './Router.jsx';
import { useEffect } from 'react';
import Loader from './Loader/Loader.jsx';
import { useDispatch,useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectIsError, selectIsLoading } from '../redux/local/selectors.js';
import { refresh } from '../redux/auth/operations';
import ErrorNotification from './CustomNotificstion/ErrorNotification';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError)
  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <>
      {isError && <ErrorNotification error={isError}/>}
      <Router />
      {isLoading && <Loader />}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
