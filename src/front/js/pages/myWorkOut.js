import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
//import "../../styles/private.css"; // Import the CSS for styling

export const MyWorkOut = () => {
	const { store, actions } = useContext(Context);
	const data = [
		{
			day: "Day 1",
			muscle_group:"Leg",
			exercises:[
				"Pullups",
				"Pushups",
				"Bar"
			]
		},
		{
			day: "Day 2",
			muscle_group:"Arm",
			exercises:[
				"Pullups",
				"Pushups",
				"Bar",
				"peckfly"
			]
		}
	]

	return (
		<>
			<div className="d-flex flex-column">
				<h1 className="d-flex justify-content-center m-4">TODAY'S WORKOUT?</h1>
				{data.map((item, index) => {
					return (
						<div>
							<button className="alert rounded-5 bg-light opacity-75 col-11" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseWidthExample-" + index} aria-expanded="false" aria-controls="collapseWidthExample">
								<div className="d-flex justify-content-center">
									<div>
										<span className="text-warning">{item.day}</span>
										<h4 className="text-dark fw-bold">{item.muscle_group}</h4>
									</div>
									<small className="text-dark">{item.exercises.length}</small>
								</div>
							</button>
							<div className="col-12">
								<div className="collapse collapse-horizontal" id={"collapseWidthExample-" + index}>
									<div className="alert rounded-5 bg-light text-dark opacity-75 col-11">
										{item.exercises}
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</>
	);
};

