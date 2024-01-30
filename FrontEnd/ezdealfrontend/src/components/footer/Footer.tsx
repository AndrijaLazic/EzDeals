import React from 'react';
import "./Footer.css";



export default function Footer() {
	return (
		<div className="containerFooter">
			<footer>
				<div className="d-flex flex-column flex-sm-row justify-content-between py-4">
					<p>© 2024 Andrija Lazic</p>
					<ul className="list-unstyled d-flex" style={{justifyContent:"center"}}>
						<li className="mx-2"><a className="link-dark" href="#"><i className="bi bi-facebook" style ={{color:"var(--NavbarFooterIconColor)"}}></i></a></li>
						<li className="mx-2"><a className="link-dark" href="#"><i className="bi bi-instagram" style = {{color:"var(--NavbarFooterIconColor)"}}></i></a></li>
						<li className="mx-2"><a className="link-dark" href="#"><i className="bi bi-reddit" style = {{color:"var(--NavbarFooterIconColor)"}}></i></a></li>
					</ul>
				</div>
			</footer>
		</div>
	);
}
