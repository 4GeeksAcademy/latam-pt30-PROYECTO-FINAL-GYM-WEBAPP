import React, { Component, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const Footer = () => {
	const { actions } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = () => {
		actions.logOut();
		navigate("/login");  // Redirect to the login page after logging out
		alert("Do you want to log out?")
	};

	return (
		<div>
			<footer className="footer fixed-bottom mt-auto py-3 text-center bg-black opacity-75 text-light">
				<div className="d-flex justify-content-center"> 
					<ul className="nav nav-underline">
						<li className="nav-item" >
							<Link className="nav-link" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top" aria-current="page" href="#" to="/">
							<i className="fa-solid fa-house fs-1 text-white"></i>
							</Link>
						</li>
						<li className="nav-item" >
							<Link className="nav-link" href="#" to="profileView/:id">
							<i className="fa-solid fa-address-card fs-1 text-white"></i>
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" href="#" to="/dashboard">
							<i className="fa-solid fa-dumbbell fs-1 text-white"></i>
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" href="#" to="/create-plan">
							<i className="fa-solid fa-circle-plus fs-1 text-white"></i>
							</Link>
						</li>
					
						<li className="nav-item">
							<Link className="nav-link" href="#" to="/logIn" 
							onClick={handleLogout} >
							<i className="fa-solid fa-right-from-bracket fs-1 text-white"></i>
							</Link>
						</li>

					</ul>
				</div>
				<div>
					{/* <p>
						GYM APP <i className="fa fa-dumbbell text-danger px-1" />
					</p> */}
					{/* <button onClick={handleLogout} className="btn btn-sm btn-outline-secondary mb-4">
						Logout
					</button> */}
				</div>
			</footer>
		</div>
	);
}