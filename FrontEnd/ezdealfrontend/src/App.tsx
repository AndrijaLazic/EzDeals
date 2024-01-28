import "bootstrap/dist/css/bootstrap-grid.min.css";
import './App.css';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import Product from './components/Product';

function App() {
  return (
	<div className="mainContainer">
		<Navbar/>
		<Product/>
	</div>
	
  );
}

export default App;
