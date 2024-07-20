import React, { useContext, useState } from "react";
//import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


function getDate() {
	const today = new Date();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
	const date = today.getDate();
	return `${month}/${date}/${year}`;
}


export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [currentDate, setCurrentDate] = useState(getDate());

	const handleSignUp = async (event) => {
		event.preventDefault();
		const success = await actions.postSignup(email, password, currentDate);
		console.log(success);
		if (success) {
			navigate("/login");
		}
	}

	return (
		<div className="card text-light col-10 mx-auto my-5 p-5">
			<form onSubmit={handleSignUp}>
				<fieldset >
					<legend className="d-flex justify-content-center fs-1 "> SIGN UP </legend>
					<div className="mb-3">
						<label htmlFor="emailInput" className="form-label">User</label>
						<input
							type="Email"
							id="EmailInput"
							className="form-control"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="passwordInput" className="form-label">Password</label>
						<input
							type="password"
							id="PasswordInput"
							className="form-control"
							placeholder=" Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<option>#seccion_to_add_text_if_needed</option>
					</div>

					<button type="submit" className="btn btn-primary">Submit</button>
				</fieldset>
			</form>
		</div>
	);
};

