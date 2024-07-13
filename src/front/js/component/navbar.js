import React from "react";
import { Link } from "react-router-dom";
import logo from "/src/front/img/gymapp_logo.jpeg"


export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark text-light shadow-lg">
			<div className="container">
				<Link to="/">
					<img 
					className="navbar-brand mb-0 h1 "
					src={logo}
					style={{ height: '50px' }} 
					alt="FM APP Logo" 
					/>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-outline-success">LOGIN</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
