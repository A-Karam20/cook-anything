import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {RouterProvider} from 'react-router-dom';
import { mainRouter } from './Routers/MainRouter';
import { ToastContainer } from 'react-toastify';

function App() {
  const router = mainRouter();
  return (
    <>
      <RouterProvider router = {router}></RouterProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
