import React, { useContext, useEffect } from 'react';
import { Context } from "../store/appContext.js";
import { useNavigate, useParams } from 'react-router-dom';
import { MyWorkOut } from '../component/MyWorkOut.jsx';

export const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const image = store.memberProfileImage;

    useEffect(() => {
        if (store.workouts.length > 0) {
            console.log("Workout names:", store.workouts.map(workout => workout.name));
        }
    }, [store.workouts]);


    
    return (
        <div className="dashboard container mt-5 mb-5">
            <div className='d-flex fw-bold justify-content-between'>
                {image && (
                    <img 
                    className="d-block mb-2 rounded-circle" 
                    width={60}
                    height={60}
                    src={image} 
                    alt="ProfileImage"
                />
                )}
                <h1 className=' align-item-center'>MY WORKOUTS</h1>
                <button 
                    className="btn btn-outline-primary mb-5 mx-4" 
                    onClick={() => navigate(`/create-plan`)}
                    >+</button>
                {/* <img />  PROFILE PHOTO IMG */}
            </div>
            {store.workouts && store.workouts.length > 0 ? (
                store.workouts.map((workout) => (
                    <MyWorkOut
                        key={workout.id}
                        id={workout.id}
                        name={workout.name}
                        days={workout.days}
                        //dayId={workout.day.id}
                        //index={id}
                    />
                ))
            ) : (
                <p>No workouts available.</p>
            )}
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