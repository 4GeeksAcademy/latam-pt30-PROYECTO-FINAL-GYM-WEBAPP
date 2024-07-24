import React, { useContext, useEffect } from 'react';
import { Context } from "../store/appContext.js";
import { useNavigate } from 'react-router-dom';
import { MyWorkOut } from '../component/MyWorkOut.jsx';

export const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="dashboard container mt-5">

            <div className='d-flex justify-content-between fw-bold'>
            <h1>YOUR WORKOUTS ! !</h1>
            <button className="btn btn-primary mb-3" onClick={() => navigate('/createEditPlan/${id}')}>+</button>
            </div>
                {store.workouts && store.workouts.length > 0 && store.workouts.map((workout, index) => (
                    <MyWorkOut 
                        key={index}
                        id={workout.id}
                        name={workout.name}
                        days={workout.days}
                        index={index}
                    />
                 
                ))}
        </div>
    );
};


// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext.js";
// import { MyWorkOut } from "../component/MyWorkOut.jsx";

// export const Dashboard = () => {
//     const { store, actions } = useContext(Context);
//     const navigate = useNavigate();

//     return (
//         <div className="dashboard">
//             <h1>Planes de Entrenamiento</h1>
//             <button className="btn btn-primary" onClick={() => navigate('/createEditPlan')}>Create New Workout</button>
//             <ul>
//                 {store.workouts.map((workout) => (
//                     <li key={workout.id} className="my-2">
//                         {workout.name}
//                         <button className="btn btn-secondary mx-2" onClick={() => navigate(`/createEditPlan/${workout.id}`)}>Edit</button>
//                         <button className="btn btn-danger" onClick={() => actions.deleteWorkout(workout.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//             <MyWorkOut />
//         </div>
//     );
// };



// import React, { useState, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext.js";
// // import "../../styles/private.css"; // Import the CSS for styling
// import { MyWorkOut } from "../component/MyWorkOut.jsx";
// // import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
// // import { faBell, faUser } from '@fontawesome/free-solid-svg-icons';




// export const Dashboard = () => {
//     const { store, actions } = useContext(Context);
//     const navigate = useNavigate();
//     return (
//         <div className="dashboard">
//             <h1>Planes de Entrenamiento</h1>
//             <button onClick={() => navigate('/createEditPlan')}>Create New Workout</button>
//             <ul>
//                 {store.workouts.map((workout) => (
//                     <li key={workout.id}>
//                         {workout.name}
//                         <button onClick={() => navigate(`/createEditPlan/${workout.id}`)}>Edit</button>
//                         <button onClick={() => {/* delete plan logic */}}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };