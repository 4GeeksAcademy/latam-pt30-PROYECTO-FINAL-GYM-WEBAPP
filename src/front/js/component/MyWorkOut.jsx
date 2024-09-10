import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const MyWorkOut = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    //const [data, setData] = useState([]);


    const handleNavigate = (workoutId, dayId, exerciseName) => {
        navigate(`/workout/${workoutId}/day/${dayId}/exercise/${exerciseName}`);
    };
    console.log();

    return (
        <div className="d-flex flex-column">
            <div>
                <button
                    className="alert rounded-5 border-success-subtle text-light bg-light fw-bolder bg-dark-subtle col-11"
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
                        <span
                            className="d-flex justify-content-end"
                            onClick={() => navigate(`/edit-plan/${props.id}`)}
                        >
                            <i className="fa-solid fa-pen text-warning"></i></span>
                    </div>
                </button>
                <div className="col-12">
                    <div
                        className="collapse collapse-horizontal "
                        id={`collapseWidthExample-${props.id}`}
                    >
                        <div>
                            {props.days.map((day, dayId) => (
                                <div key={dayId}>
                                    
                                    <button
                                        className="alert rounded-5 text-light fw-semibold bg-body-secondary border-warning-subtle col-11"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#dayCollapse-${props.id}-${dayId}`}
                                        aria-expanded="false"
                                        aria-controls={`dayCollapse-${props.id}-${dayId}`}
                                    >
                                        <div className="d-flex justify-content-center">
                                            <h3>
                                            {day.day.name} - {day.muscle_group.map((group, idGroup) => {
                                                       return <span key={idGroup}>{group.name}</span>
                                                    })}
                                            </h3>
                                            {console.log(day.muscle_group)}
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <small className="text-light px-2">
                                                {day?.exercises?.length || 0} EXERCISES</small>
                                        </div>
                                    </button>
                                    <div
                                        className="collapse collapse-horizontal"
                                        id={`dayCollapse-${props.id}-${dayId}`}
                                    >
                                        {day.exercises.map((exercise, exerciseId) => (
                                            <div
                                                key={exerciseId}
                                                onClick={() => handleNavigate(props.id, dayId, exercise.name)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <div
                                                    className="alert border-danger-subtle rounded-5 bg-light text-dark fw-medium col-11"
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


