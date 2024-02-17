import { useRef } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../assets/pictures.util";

export default function Navbar() {


	const searchString = useRef("");

	const navigate = useNavigate();

	async function startSearch(){
		navigate("/pretraga?searchString="+searchString.current+"&page=1", { replace: true });
	}

	const handleKeyDown=(event:any)=>{
		event.preventDefault();
		startSearch();
	};

	function onInput(value:string){
		searchString.current=value;
		console.log(searchString.current);
	}


	return (
		<nav id="siteNavbar" className="navbar navbar-expand-md navbar-light">
			<a className="navbar-brand" href="#">
				<div className="mx-auto Logo" style={{backgroundImage:`url(${getImageUrl("./pictures/EzDealLogo.png")})`}}></div>
			</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon" ></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link className="nav-link" to="/kategorije">Proizvodi</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/noviProizvodi">Najnovije</Link>
					</li>
				</ul>
				<form className="form-inline my-2 my-lg-0" onSubmit={handleKeyDown}>
					<div className="input-group">
						<input onChange={(e) =>onInput(e.target.value)}  type="text" className="form-control" placeholder="Pretrazi"/>
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
