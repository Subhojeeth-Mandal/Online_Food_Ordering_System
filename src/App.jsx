import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import MainLayout from './layout/MainLayout';
import ErrorPage from './pages/ErrorPage';
import { useApp, AppProvider } from './context/AppContext';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" />;
};

const MainApp = () => {
  return (
    <div className="app-wrapper">
      <main style={{ minHeight: 'calc(100vh - 350px)' }}>
        <Routes>
         <Route element={<MainLayout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
             }/>
         </Route>
         <Route path="/login" element={<LoginRegister />} />
         <Route path='*' element={<Navigate to={"/pagenotfound"}/>}/>
         <Route path='/pagenotfound' element={<ErrorPage/>}/>
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <MainApp />
      </Router>
    </AppProvider>
  );
}

export default App;
