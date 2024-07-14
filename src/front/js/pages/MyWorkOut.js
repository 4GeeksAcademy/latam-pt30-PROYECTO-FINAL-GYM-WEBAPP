import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
//import "../../styles/private.css"; // Import the CSS for styling
export const MyWorkOut = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const data = [
        {
            day: "Day 1",
            muscle_group: "Leg",
            exercises: [
                "Pullups",
                "Pushups",
                "Bar"
            ],
            description: "",
            reps: "8",
            sets: "4",
            rest_time: "20s"
        },
        {
            day: "Day 2",
            muscle_group: "Arm",
            exercises: [
                "Pullups",
                "Pushups",
                "Bar",
                "peckfly",
            ],
            rest_time: "20",
            description: "",
            reps: "20",
            sets: "3"
        }
    ];
    const handleNavigate = (exercise) => {
        navigate(`/exercise/${exercise}`);
    };
    return (
        <div>
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
                                    <div>
                                        {item.exercises.map((exercise, exerciseIndex) => (
                                            <div
                                                key={exerciseIndex}
                                                onClick={() => handleNavigate(exercise)} style={{ cursor: "pointer" }}
                                            >
                                                <div className="alert rounded-5 bg-light text-dark opacity-75 col-11" role="alert">
                                                    {exercise}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};