import React, { useContext, useState, useEffect } from "react";
//import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { VideoCarousel } from "../component/VideoCarousel.jsx";



export const SignUp = () => {
	const { actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [images, setImages] = useState([]);
	const [randomImage, setRandomImage] = useState(null);

	const handleSignUp = async (event) => {
		event.preventDefault();
		const success = await actions.postSignup(email, password);
		console.log(success);
		
		if (success) {
			navigate("/login");
		} else {
            // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
            alert("Registration failed. Please try again.");
        }
    };

	

	// Array of image URLs

	const imageUrls = Array.from({ length: 19 }, async (_, i) => await import(`../../img/${i + 1}.webp`));
			console.log(imageUrls);
	
	// Select a random image
	// const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];

	useEffect(() => {
		const getImages = async () => {
		  const imageUrls = await Promise.all(
			Array.from({ length: 19 }, (_, i) => import(`../../img/${i + 1}.webp`))
		  );
		  
		  console.log(imageUrls); // This will show all the image URLs
	
		  // Select a random image
		  const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
		  setRandomImage(randomImage.default); // Update state with the selected image
		};
	
		getImages();
	  }, []);
	  console.log(randomImage);
	  
	return (
		<>	
			<div className="alert alert-danger text-light col-10 mx-auto my-5 p-5" style={{ backgroundImage: `url(${randomImage})`, backgroundSize: 'cover' }}>
				<form onSubmit={handleSignUp}>
					<fieldset>
						<legend className="d-flex justify-content-center display-3 "> SIGN UP </legend>
						<div className="card bg-opacity-10 p-4 m-3 border-danger-subtle">
							<h3>GYM APP <i className="fa fa-dumbbell text-danger px-1 mx-2"/></h3>
							<h4>Input your workouts and display them ⬇︎</h4>
							<h5>⏱️ Click between sets do not rest more than needed.</h5>
							<h5 className="text-secondary">Members can see their improvements 🎖️ 📊 </h5>
						</div>
						
						<strong className="mb-3">🔓 Sign up for Free</strong>
						<div className="my-3">
							<label htmlFor="EmailInput" className="form-label">User</label>
							<input
								type="Email"
								id="EmailInput"
								className="form-control border-danger-subtle"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="PasswordInput" className="form-label">Password</label>
							<input
								type="password"
								id="PasswordInput"
								className="form-control border-danger-subtle"
								placeholder=" Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</fieldset>
				</form>
			</div>
			<div className="d-flex flex-column justify-content-center">
				<div className="card col-10 border-warning text-white bg-opacity-75 mb-5 mx-auto py-4 px-5">
					<div className="card-body">
						<h1 className="card-title">💪 Master Your Workout:</h1>
						<h2 className="card-title">Perfect Your Form for Optimal Results 🏋️ </h2>
						{/* <a href="#" className="card-link">Card link</a>
						<a href="#" className="card-link">Another link</a> */}
					</div>	
				</div>		
				<div className="card col-10 border-danger text-white bg-opacity-75 mb-5 mx-auto py-4 px-5">
					<div className="card-body">
					<h3 className="card-subtitle mb-2 text-body-secondary">🚨 Correct exercise execution is crucial for safety  and effectiveness. </h3>
					</div>	
				</div>		
				<div className="card col-10 border-success text-white bg-opacity-75 mb-5 mx-auto py-4 px-5">
					<div className="card-body">
					<h3 className="card-text"> ✅ Achieve your best workout with our step-by-step demonstrations. </h3>
					<p className="card-text">Check out our video library for expert guidance on proper postures and techniques... 🎥 </p>

					</div>	
				</div>		
				<div>
					<h4>Check Out Our Video Library...</h4>
					<VideoCarousel/>		
				</div>
			</div>
		</>
	);
};

