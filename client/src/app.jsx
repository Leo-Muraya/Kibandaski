import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider, store } from './logic';
<<<<<<< HEAD
import { Home, RestaurantDetail, Checkout } from './components';
=======
import { Home, RestaurantDetail, Checkout } from './pages';
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
import { Navbar } from './components';
import '../styles/main.css';


export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurants/:id" element={<RestaurantDetail />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}