import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const MyWorkOut = (props) => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [data, setData] = useState([]);


    const handleNavigate = (id, dayIndex, name) => {
        navigate(`/workout/${id}/day/${dayIndex}/exercise/${name}`);
    };

    return (
        <div className="d-flex flex-column">
                <div>
                    <button
                        className="alert rounded-5 text-light bg-light fw-bolder bg-dark-subtle col-11"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseWidthExample-${props.id}`}
                        aria-expanded="false"
                        aria-controls={`collapseWidthExample-${props.id}`}
                    >
                        <div className="d-flex justify-content-center">
                            <div>
                                <h1 className="d-flex justify-content-center m-4">{props.name}</h1>
                            </div>
                            <span className="d-flex justify-content-end" onClick={() => navigate(`/createEditPlan/${props.id}`)}><i class="fa-solid fa-pen text-warning"></i></span>
                        </div>
                    </button>
                    <div className="col-12">
                        <div
                            className="collapse collapse-horizontal bg-dark-subtle"
                            id={`collapseWidthExample-${props.id}`}
                        >
                            <div>
                                {props.days.map((day, dayIndex) => (
                                    <div key={dayIndex}>
                                        <button
                                            className="alert rounded-5 bg-light text-light fw-semibold bg-body-secondary col-11"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#dayCollapse-${props.index}-${dayIndex}`}
                                            aria-expanded="false"
                                            aria-controls={`dayCollapse-${props.index}-${dayIndex}`}
                                        >
                                            <div className="d-flex justify-content-center">
                                                <h3>{day.day} - {day.muscle_group}</h3>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <small className="text-light px-2">{props.days[props.index].exercises.length} EXERCISES</small>
                                            </div>
                                        </button>
                                        <div
                                            className="collapse collapse-horizontal"
                                            id={`dayCollapse-${props.index}-${dayIndex}`}
                                        >
                                            {day.exercises.map((exercise, exerciseIndex) => (
                                                <div
                                                    key={exerciseIndex}
                                                    onClick={() => handleNavigate(props.id, dayIndex, exercise.name )}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <div
                                                        className="alert rounded-5 bg-light text-dark fw-medium col-11"
                                                        role="alert"
                                                    >
                                                        {exercise.name} - {exercise.sets} Sets x {exercise.reps} Reps
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};


