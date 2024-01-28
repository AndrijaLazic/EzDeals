import React from 'react';
import "./Navbar.css";
import logo from "../../assets/pictures/EzDealLogo.png";
import { BiSearchAlt } from "react-icons/bi";



export default function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light">
			<a className="navbar-brand" href="#">
				<div className="mx-auto Logo"></div>
			</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<a className="nav-link" href="#">Proizvodi</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Najnovije</a>
					</li>
				</ul>
				<form className="form-inline my-2 my-lg-0">
					<div className="input-group">
						<input type="text" className="form-control" placeholder="Pretrazi" aria-label="Recipient's username" aria-describedby="button-addon2"/>
							<div className="input-group-append">
								<button className="btn btn-outline-secondary" type="button" id="button-addon2">
									<i className="bi bi-search"></i>
								</button>
							</div>
					</div>
				</form>
			</div>
		</nav>
	);
}
