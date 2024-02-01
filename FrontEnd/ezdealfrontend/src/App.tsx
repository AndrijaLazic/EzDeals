import "bootstrap/dist/css/bootstrap-grid.min.css";
import './App.css';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import NewestProducts from "./pages/NewestProducts";
import CategoriesSelection from "./pages/CategoriesSelection";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/footer/Footer";
import CategoryProducts from "./pages/CategoryProducts";

function App() {
  return (
	<div id="mainContainer">
		<BrowserRouter>
		<Navbar/>
		<div id="routesBody">
			<Routes >
				<Route path="/" element={<NewestProducts/>}/>
				<Route path="/kategorije">
					<Route index element={<CategoriesSelection/>}/>
					<Route path=":category">
						<Route index element={<CategoryProducts/>}/>
						<Route path=":productId" element={<ProductPage/>}/>
					</Route>

				</Route>
				<Route path="/noviProizvodi" element={<NewestProducts/>}/>
				<Route path="/proizvod">
					<Route path=":productId" element={<ProductPage/>}/>
				</Route>
			</Routes>
		</div>
		<Footer/>
		</BrowserRouter>
	</div>
	
  );
}

export default App;
