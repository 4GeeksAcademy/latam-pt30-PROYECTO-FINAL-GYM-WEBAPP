// src/components/ExerciseForm.js
import React from "react";

export const ExerciseForm = ({ exercise, updateExercise, removeExercise }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateExercise(exercise.id, { ...exercise, [name]: value });


    };

    return (
        <div className="exercise-form mb-2">
            <input
                type="text"
                name="name"
                value={exercise.name}
                onChange={handleChange}
                placeholder="Exercise Name"
                className="form-control mb-1"
            />
            <input
                type="number"
                name="rounds"
                value={exercise.rounds}
                onChange={handleChange}
                placeholder="How many Rounds?"
                className="form-control mb-1"
                min={1} // Evitar valores negativos o cero
            />
            <input
                type="number"
                name="reps"
                value={exercise.reps}
                onChange={handleChange}
                placeholder="How many Reps?"
                className="form-control mb-1"
                min={1} // Evitar valores negativos o cero
            />
            <textarea
                name="description"
                value={exercise.description}
                onChange={handleChange}
                placeholder="Description (optional)"
                className="form-control mb-2"
            />
            <div 
                id="exercisesHelp" 
                className="form-text"
            >You can still edit before Saving Day</div>
            <button 
                className="btn btn-danger btn-sm" 
                onClick={() => removeExercise(exercise.id)}
            >Eliminar Ejercicio
            </button>
        </div>
    );
};





//Sep 12 2024 2:37pm Change to add Sets.jsx as father
// import React, { useState, useEffect } from 'react';


// export const ExcerciseForm = ({ exercise, setExercises, index }) => {
//     const [formState, setFormState] = useState(exercise);

//     useEffect(() => {
//         setExercises(prevExercises => {
//             const newExercises = [...prevExercises];
//             newExercises[index] = formState;
//             return newExercises;
//         });
//     }, [formState, index, setExercises]);


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormState(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };


//     return (
        
//             <div className="exercise-form border border-success-subtle rounded p-3 mb-3">
//                 {Object.keys(formState).map(key => (
//                     <div className="form-group" key={key}>
//                         <label htmlFor={key} className="form-label">
//                             {key.charAt(0).toUpperCase() + key.slice(1)}
//                             </label>
//                         <input
//                             key={key}
//                             type={key === 'reps' || key === 'sets' || key === 'rest_time' ? 'number' : 'text'}
//                             className="form-control"
//                             name={key}
//                             placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//                             value={formState[key]}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 ))}
//                 <div id="exercisesHelp" className="form-text">You can still edit before Saving Day</div>
//                 <button onClick='{actions.deleteExercise}' className='btn btn-outline-secondary btn-sm mt-3'>DELETE</button>
//             </div>
//         );
//     };



// import React, { useState, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Context } from '../store/appContext';


// export const ExerciseForm = ({ exercise, setExercises, index }) => {
//     const [name, setName] = useState(exercise.name);
//     const [reps, setReps] = useState(exercise.reps);
//     const [sets, setSets] = useState(exercise.sets);
//     const [restTime, setRestTime] = useState(exercise.rest_time);
//     const [description, setDescription] = useState(exercise.description);

//     const hadnleUpdate

//     return (
//         <div className="exercise-form">
//             <input
//                 type="text"
//                 placeholder="Exercise Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//             />
//             <input
//                 type="number"
//                 placeholder="Reps"
//                 value={reps}
//                 onChange={(e) => setReps(e.target.value)}
//             />
//             <input
//                 type="number"
//                 placeholder="Sets"
//                 value={reps}
//                 onChange={(e) => setSets(e.target.value)}
//             />
//             <input
//                 type="number"
//                 placeholder="Resting Time"
//                 value={restTime}
//                 onChange={(e) => setRestTime(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//             />
//         </div>
//     );
// };

//HandleSetExercise
//Set exercise con onclick
//lo tenemos que hacer aqui o en el componente DayForm?



//Create a logic as addExercise for exercises and take that to Create Edit excercise
// const addDay = () => {
//     setDays([...days, { day: '', muscleGroups: [], exercises: [] }]);