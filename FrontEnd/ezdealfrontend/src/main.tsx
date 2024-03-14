import "bootstrap/dist/css/bootstrap-grid.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewestProducts from "./pages/NewestProducts.tsx";
import ProductSeach from "./pages/ProductSeach.tsx";
import CategoriesSelection from "./pages/CategoriesSelection.tsx";
import CategoryProducts from "./pages/CategoryProducts.tsx";
import ProductPage from "./pages/ProductPage/ProductPage.tsx";

const router = createBrowserRouter([
	{
	  element:<App/>,
	  path: "/",
	  children:[
		{
			path: "",
			element:<NewestProducts />,
		},
		{
			path: "noviProizvodi",
			element:<NewestProducts />,
		},
		{
			path: "pretraga",
			element:<ProductSeach />,
		},
		{
			path: "kategorije",
			element:<CategoriesSelection />,
		},
		{
			path: "kategorije/:category",
			element:<CategoryProducts />,
		},
		{
			path: "kategorije/:category/:productId",
			element:<ProductPage />,
		}
	  ]
	}
	
 ]);


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>,
);
