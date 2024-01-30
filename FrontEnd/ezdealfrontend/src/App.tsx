import "bootstrap/dist/css/bootstrap-grid.min.css";
import './App.css';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import NewestProducts from "./pages/NewestProducts";
import Categories from "./pages/Categories";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/footer/Footer";

function App() {
  return (
	<div>
		<BrowserRouter>
		<Navbar/>
		<Routes>
			<Route path="/" element={<NewestProducts/>}/>
			<Route path="/kategorije" element={<Categories/>}/>
			<Route path="/noviProizvodi" element={<NewestProducts/>}/>
			<Route path="/proizvod" element={<ProductPage/>}>
				<Route path=":productId" element={<ProductPage/>}/>
			</Route>
		</Routes>
		<Footer/>
		</BrowserRouter>
	</div>
	
  );
}

export default App;
