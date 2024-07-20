
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
// import "../../styles/private.css"; // Import the CSS for styling
import { MyWorkOut } from "../component/MyWorkOut.jsx";
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
// import { faBell, faUser } from '@fontawesome/free-solid-svg-icons';




export const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    return (
        <div className="dashboard">
            <h1>Planes de Entrenamiento</h1>
            <button onClick={() => navigate('/createEditPlan')}>Create New Workout</button>
            <ul>
                {store.workouts.map((workout) => (
                    <li key={workout.id}>
                        {workout.name}
                        <button onClick={() => navigate(`/createEditPlan/${workout.id}`)}>Edit</button>
                        <button onClick={() => {/* delete plan logic */}}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};