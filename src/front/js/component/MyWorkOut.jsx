import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const MyWorkOut = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(store.workouts);
    }, [store.workouts]);

    const handleNavigate = (exercise) => {
        navigate(`/workout/${exercise.name}`, { state: { exercise } });
    };

    return (
        <div className="d-flex flex-column">
            <h1 className="d-flex justify-content-center m-4">TODAY'S WORKOUT</h1>
            {data.map((item, index) => (
                <div key={index}>
                    <button
                        className="alert rounded-5 bg-light opacity-75 col-11"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseWidthExample-${index}`}
                        aria-expanded="false"
                        aria-controls={`collapseWidthExample-${index}`}
                    >
                        <div className="d-flex justify-content-center">
                            <div>
                                <span className="text-warning">{item.name}</span>
                                <h4 className="text-dark fw-bold">{item.muscle_group}</h4>
                            </div>
                            <small className="text-dark">{item.exercises.length}</small>
                        </div>
                    </button>
                    <div className="col-12">
                        <div
                            className="collapse collapse-horizontal"
                            id={`collapseWidthExample-${index}`}
                        >
                            <div>
                                {item.days.map((day, dayIndex) => (
                                    <div key={dayIndex}>
                                        <button
                                            className="alert rounded-5 bg-light text-dark opacity-75 col-11"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#dayCollapse-${index}-${dayIndex}`}
                                            aria-expanded="false"
                                            aria-controls={`dayCollapse-${index}-${dayIndex}`}
                                        >
                                            {day.day} - {day.muscle_group}
                                        </button>
                                        <div
                                            className="collapse collapse-horizontal"
                                            id={`dayCollapse-${index}-${dayIndex}`}
                                        >
                                            {day.exercises.map((exercise, exerciseIndex) => (
                                                <div
                                                    key={exerciseIndex}
                                                    onClick={() => handleNavigate(exercise)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <div
                                                        className="alert rounded-5 bg-light text-dark opacity-75 col-11"
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
            ))}
        </div>
    );
};





{/* 
// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";


// export const MyWorkOut = () => {
//     const { store } = useContext(Context);
//     const navigate = useNavigate();
//     const [data, setData] = useState([]);
    
//     useEffect(() => {
//         setData(store.workouts);
//     }, [store.workouts]);

//     const handleNavigate = (exercise) => {
//         navigate(`/workout/${exercise.name}`, { state: { exercise } });
//     };

//     return (
//         <div>
//             <div className="d-flex flex-column">
//                 <h1 className="d-flex justify-content-center m-4">TODAY'S WORKOUT?</h1>
//                 {data.map((item, index) => {
//                     return (
//                         <div key={index}>
//                             <button className="alert rounded-5 bg-light opacity-75 col-11" 
//                             type="button" 
//                             data-bs-toggle="collapse" 
//                             data-bs-target={`#collapseWidthExample-${index}`}  
//                             aria-expanded="false" 
//                             aria-controls={`collapseWidthExample-${index}`}
//                             >
//                             <div className="d-flex justify-content-center">
//                                 <div>
//                                     <span className="text-warning">{item.name}</span>
//                                     <h4 className="text-dark fw-bold">{item.muscle_group}</h4>
//                                 </div>
//                                 <small className="text-dark">{item.exercises.length}</small>
//                             </div>    
//                             </button>
//                             <div className="col-12">
//                                 <div className="collapse collapse-horizontal" id={`collapseWidthExample-${index}`}>
//                                     <div>
//                                     {item.days.map((day, dayIndex) => (

//                                             <div
//                                                 key={exerciseIndex}
//                                                 onClick={() => handleNavigate(exercise.name)} style={{ cursor: "pointer" }}
//                                             >
//                                                 <div className="alert rounded-5 bg-light text-dark opacity-75 col-11" role="alert">
//                                                     {exercise.name} - {exercise.sets} Sets x {exercise.reps} Reps
//                                                 </div>
//                                             </div>
//                                     ))}
//                                     </div>
//                                 </div>
//                             </div>
//                     </div>
//                 )})}
//             </div>
//         </div>
//     );
// }; */}
