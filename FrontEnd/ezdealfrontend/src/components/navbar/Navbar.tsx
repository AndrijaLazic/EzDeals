import { useState } from "react";
import "./Navbar.css";
import { productService } from "../../services/product.service";
import { SearchInfo, SortType } from "../../dataModels/product";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

	const [searchString, setsearchString] = useState("");

	const navigate=useNavigate();

	// useEffect(() => {
	// 	console.log(searchString);
	// }, [searchString]);

	async function startSearch(){
		const body:SearchInfo={
			pageNum: 1,
			sortOrder: SortType.ByPriceAcending,
			productCategory: "",
			numberOfProducts: 24,
			searchString: searchString
		};

		const response = await productService.getProductsFromSearch(body);

		if (response.error) {
			return console.log(response);
		}

		console.log(response)
	}

	return (
		<nav id="siteNavbar" className="navbar navbar-expand-md navbar-light">
			<a className="navbar-brand" href="#">
				<div className="mx-auto Logo"></div>
			</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon" ></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<a className="nav-link" href="/kategorije">Proizvodi</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/noviProizvodi">Najnovije</a>
					</li>
				</ul>
				<form className="form-inline my-2 my-lg-0">
					<div className="input-group">
						<input value={searchString} onChange={(e) => setsearchString(e.target.value)} type="text" className="form-control" placeholder="Pretrazi" aria-label="Recipient's username" aria-describedby="button-addon2"/>
						<div className="input-group-append">
							<button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={startSearch}>
								<i className="bi bi-search" style = {{color:"var(--NavbarFooterIconColor)"}}></i>
							</button>
						</div>
					</div>
				</form>
			</div>
		</nav>
	);
}
