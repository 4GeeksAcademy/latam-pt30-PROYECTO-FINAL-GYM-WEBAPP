// src/components/ExerciseForm.js
import React, { useState }  from "react";

export const ExerciseForm = ({ exercise, updateExercise, removeExercise }) => {
    // Estado local para el valor del input de reps
    const [inputValue, setInputValue] = useState('');
    
    // Actualizar el ejercicio en función de los cambios de los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Actualizamos el ejercicio con el nuevo valor
        updateExercise(exercise.id, { ...exercise, [name]: value });
    };

    console.log(Array.isArray(exercise.rounds)); // Debería ser true
    console.log(exercise.rounds); // Verifica el contenido
    
    // Agregar un round al ejercicio
    const addRound = (reps) => {
        // Creamos un nuevo round con el número de reps introducido
        const newReps = [...(exercise.reps || []), reps];
        // Incrementamos el número de rondas
        const newRounds = (exercise.rounds || 0) + 1;
        // Actualizamos el ejercicio con los nuevos rounds
        updateExercise(exercise.id, { ...exercise, reps: newReps, rounds: newRounds });
    };

    // Manejar la adición de un nuevo round
    const handleAddRound = () => {
        const reps = parseInt(inputValue); //Convertimos el valor del input a número
        if (!isNaN(reps) && reps > 0) { // Validamos que sea un número válido
            addRound(reps);
            setInputValue(''); // Limpiar el input después de agregar
        }
    };

    console.log(exercise.name);
    
    return (
        <div className="exercise-form mb-2 border border-success-subtle p-4">
            <label htmlFor={`name-${exercise.id}`} className="form-label">Exercise Name</label>
            <input
                type="text"
                name="name"
                id={`name-${exercise.id}`}
                value={exercise.name}
                onChange={handleChange}
                placeholder="Exercise Name"
                className="form-control mb-1"
            />
            
            {/* <label htmlFor={`rounds-${exercise.id}`} className="form-label">How many Rounds?</label>
            <input
                type="number"
                name="rounds"
                id={`rounds-${exercise.id}`}
                value={exercise.rounds}
                onChange={handleChange}
                placeholder="How many Rounds?"
                className="form-control mb-1"
                min={1} // Evitar valores negativos o cero
            />
            
            <label htmlFor={`reps-${exercise.id}`} className="form-label">How many Reps?</label>
            <input
                type="number"
                name="reps"
                id={`reps-${exercise.id}`}
                value={exercise.reps}
                onChange={handleChange}
                placeholder="How many Reps?"
                className="form-control mb-1"
                min={1} // Evitar valores negativos o cero
            /> */}



                {console.log(exercise)}
                {console.log(exercise.rounds)}
            {/* <div>
                {exercise.rounds && exercise.rounds.map((round, index) => (
                    <div key={index}>
                        <p>Round {round.roundNumber}: {round.reps} reps</p>
                    </div>
                ))}
            </div>     */}
             {/* <div className="rounds-section">
                {exercise?.rounds?.length > 0 ? (
                    exercise.reps.map((reps, index) => ( */}
                        {/* // <div key={index} className="round-item">
                        //     <p>
                        //         {/* <strong>Round {round.roundNumber}:</strong> {round.reps} reps */}
                        {/* //         <strong>Round {index + 1}:</strong> {reps} reps
                        //     </p> */}
                        {/* // </div> */}
                {/* //     ))
                // ) : (
                //     // <p>No rounds added yet.</p>
                // )}
            </div> */}

            {/* Mostrar rondas y reps */}
            <div className="rounds-section">
                {exercise?.rounds > 0 ? (
                    // Iteramos sobre las rondas usando Array.from({ length: exercise.rounds })
                    Array.from({ length: exercise.rounds }).map((_, index) => (
                        <div key={index} className="round-item">
                            <p>
                                <strong>Round {index + 1}: </strong> 
                                
                                {/* Si hay múltiples valores en reps, mostramos el valor correspondiente */}
                                {/* Si reps tiene solo un valor, lo usamos para todas las rondas   */}
                                {exercise.reps.length > 1 
                                    ? exercise.reps[index] || exercise.reps[exercise.reps.length - 1]
                                    : exercise.reps[0]} reps
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No rounds added yet.</p>
                )}
            </div>


            {/* Input para agregar round y reps */} 
            <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter reps for new round"
                className="form-control mb-1 m-2"
            />
            <button 
                className="btn btn-sm btn-outline-light m-3"
                onClick={handleAddRound}
                >Add Round
            </button>



            
            <label htmlFor={`description-${exercise.id}`} className="form-label"
            >Description</label>
            
            <textarea
                name="description"
                id={`description-${exercise.id}`}
                value={exercise.description}
                onChange={handleChange}
                placeholder="Description (optional)"
                className="form-control mb-2 "
            />
            
            {/* <div id="exercisesHelp" className="form-text">
                You can still edit before Saving Day
            </div> */}
            
            <button
                className="btn btn-outline-secondary btn-sm mt-3"
                onClick={() => removeExercise(exercise.id)}
            >
                Delete Exercise
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