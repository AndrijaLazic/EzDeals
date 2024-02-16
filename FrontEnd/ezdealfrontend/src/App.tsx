import "bootstrap/dist/css/bootstrap-grid.min.css";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";


function App() {
  return (
	<div id="mainContainer">
		<Navbar/>
		<div id="routesBody">
			<Outlet />
		</div>
		<Footer/>
	</div>
  );
}

export default App;
