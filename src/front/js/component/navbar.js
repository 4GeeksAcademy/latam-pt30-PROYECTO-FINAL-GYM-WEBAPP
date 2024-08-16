import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "/src/front/img/gymapp_logo.jpeg"


export const Navbar = ({ MemberSignup }) => {
	const { store } = useContext(Context)

	return (
		<nav className="navbar border-bottom border-body navbar-dark justify-content-between text-light shadow-lg">
			<div className="container ">

				<Link to="/" className="navbar-brand mx-2" href="#">
					GYM APP<i className="fa fa-dumbbell text-danger px-1 mx-2" />
				</Link>
				{/* <div className="ml-auto">
					<Link to="/memberSignup">
					</Link>
				</div> */}
				<div className="ml-auto">
					<button
						className="btn btn-outline-warning btn-sm mt-1 mx-3"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasExample"
						aria-controls="offcanvasExample"
					>MEMBER
					</button>
					{
						!store.userToken && <Link to="/login">
							<button className="btn btn-outline-success">LOGIN</button>
						</Link>
					}
					{/* {!store.user ? (
						<Link to="/login">
							<button className="btn btn-outline-success">LOGIN</button>
						</Link>
					) : null} */}
				</div>
			</div>
			{MemberSignup && <MemberSignup />}
		</nav>
	);
};

// cndicion ternarion cuansdo store.user - current -  user esta vacion me muestra el boton. si tengo usariio ya esta logeado no se muestra.