import { useState } from "react";
import "./Navbar.css";
import { useSearchParams } from "react-router-dom";

export default function Navbar() {

	const [searchParams] = useSearchParams();

	const [searchString, setsearchString] = useState(searchParams.get('searchString') || "");
	
	
	if(searchParams.get('searchString')){
		//setsearchString();
		console.log(searchParams.get('searchString'));
	}

	async function startSearch(){
		window.location.href = "/pretraga?searchString="+searchString+"&page=1";
	}

	const handleKeyDown=(event:any)=>{
		event.preventDefault();
		startSearch();
	};

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
				<form className="form-inline my-2 my-lg-0" onSubmit={handleKeyDown}>
					<div className="input-group">
						<input onChange={(e) => setsearchString(e.target.value)} value={searchString}  type="text" className="form-control" placeholder="Pretrazi"/>
						<div className="input-group-append">
							<button className="btn btn-outline-secondary" type="submit" id="button-addon2">
								<i className="bi bi-search" style = {{color:"var(--NavbarFooterIconColor)"}}></i>
							</button>
						</div>
					</div>
				</form>
			</div>
		</nav>
	);
}
