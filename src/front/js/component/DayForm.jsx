
//Sep 12 2024 2:37pm Change to add Sets.jsx as son
import React, { useEffect, useState } from 'react';
import { Sets } from "./Sets.jsx";
//import { ExcerciseForm } from './ExcerciseForm.jsx';
//import { Context } from '../store/appContext.js';


export const DayForm = ({ day, muscles, onSave }) => {
// Initialize form state with provided day data or defaults
    const [formState, setFormState] = useState(day);
    // Handle day name changes
    const handleDayChange = (e) => {
        setFormState({ ...formState, day: e.target.value });
    };

    //Save day
    const handleSaveDay = (dayId) => {
        const updatedWorkout = { ...workout };
        updatedWorkout.days = day.map((day) => (day.id === dayId ? day : updatedWorkout.days));
        setFormState(updatedWorkout);
    };
    
    //prevenir que no se actualice la palgina
    // Al agregar un nuevo dia guardamos cambios 
    console.log(formState.day);


// //Handle exercises__________________
//     const [exercises, setExercises] = useState(day?.exercises || []);
//     const handleAddExercise = async (e) => {
//         e.preventDefault()
//         setExercises([...exercises, { id: "", name: "", reps: "", sets: "", rest_time: "", description: "", super_set: "" }]);
//         //handleSaveDay()
//     };

//Selected Muscle Groups from day.musclegroup_____________
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(day.muscle_group || []);

    useEffect(() => {
        setSelectedMuscleGroups(day.muscle_group || []); // Actualiza los grupos si el día cambia
    },[day.muscle_group]);
    
    console.log(day.muscle_group);

    // Handle muscle group selection
    const handleMuscleGroupChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedMuscleGroups([...selectedMuscleGroups, { name: value }]); // Agregar si está seleccionado
        } else {
            setSelectedMuscleGroups(selectedMuscleGroups.filter(group => group.name !== value)); // Quitar si no lo está
        }
    };

//Hanlde Sets instead of exercises________________
    //const [sets, setSets] = useState(day?.sets || []);
    // const addSet = (type = 'Set') => {
    //     const newSet = {
    //         id: Date.now(),
    //         type: 'SuperSet', // o 'TriSet', puedes hacerlo seleccionable
    //         rest_time: 120, // 2 minutos para pares, 180 para tercias
    //         exercises: [
    //                 { id: "", name: "", reps: "", sets: "", rest_time: "", description: ""},
    //                 { id: "", name: "", reps: "", sets: "", rest_time: "", description: ""},
    //         ]
    //     };
    //     setSets([...sets, newSet]);
    // };
    const [sets, setSets] = useState(day?.sets || []);
    const addSet = (type = 'Set') => {
        // Definir la cantidad de ejercicios y el tiempo de descanso según el tipo de set
        let exercisesCount = 1;
        let restTime = 60; // Por defecto 1 minuto
        
        switch (type) {
            case 'SuperSet':
                exercisesCount = 2;
                restTime = 120; // 2 minutos
                break;
            case 'TriSet':
                exercisesCount = 3;
                restTime = 180; // 3 minutos
                break;
            case 'GrandSet':
                exercisesCount = 4;
                restTime = 240; // 4 minutos
                break;
            default:
                exercisesCount = 1;
                restTime = 60; // 1 minuto
                break;
        }

        // Crear los ejercicios vacíos basados en la cantidad
        const exercises = Array.from({ length: exercisesCount }, () => ({
            id: Date.now() + Math.random(), // Un id único basado en timestamp y random
            name: "",
            reps: "",
            rounds: "",
            rest_time: restTime,
            description: ""
        }));

        // Crear el nuevo set
        const newSet = {
            id: Date.now(), // El id del set también puede ser un timestamp
            type: type, // Tipo del set (Set, SuperSet, etc.)
            rest_time: restTime, // Tiempo de descanso
            exercises: exercises // Array de ejercicios
        };

        // Agregar el nuevo set al estado
        setSets([...sets, newSet]);
    };


    const updateSet = (updatedSet) => {
        const updatedSets = sets.map(set => set.id === updatedSet.id ? updatedSet : set);
        setSets(updatedSets);
    };

    const removeSet = (id) => {
        const updatedSets = sets.filter(set => set.id !== id);
        setSets(updatedSets);
    };

    const handleSubmit = () => {
        // Aquí manejarías la lógica para enviar los sets al backend
        // Por ejemplo, haciendo una petición POST para cada set
    };

    
    
    return (
        <form className="day-form p-3">
            <h5>Day: </h5>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control border-warning-subtle"
                    name="name"
                    placeholder="Day Name"
                    value={formState.day.name}
                    onChange={handleDayChange}
                />
            </div>


            <div className="day-form">
                <div className='my-3'>
                    <h5>Muscle Groups:</h5>
                    <div className="d-flex flex-wrap">
                        {muscles && muscles.map((group, index) => (
                            <div key={group.id} className="form-check form-check-inline">
                                <input
                                    type="checkbox"
                                    className="btn-check"
                                    id={`muscleGroup-${index}`}
                                    value={group.name}
                                    checked={selectedMuscleGroups.includes(group.name)}
                                    onChange={handleMuscleGroupChange}
                                    //autoComplete="off"
                                />
                                <label className="btn" htmlFor={`muscleGroup-${index}`}>
                                    {group.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div id="muscleGroupHelp" className="form-text">You can select more than one muscular group per day</div>
                </div>


                <div className="exercises-section">
                    <h4>N° Exercises per Round</h4>
                    {/* {exercises?.map((exercise, index) => (
                        <ExcerciseForm
                            key={index}
                            exercise={exercise}
                            setExercises={setExercises}
                            index={index}
                        />
                    ))} */}
                    {sets.map(set => (
                        <Sets
                            key={set.id}
                            set={set}
                            updateSet={updateSet}
                            removeSet={removeSet}
                        />
                    ))}
                    <div id="muscleGroupHelp" className="form-text">Set = 1 Exercise, SuperSet = 2 Exercises, TriSet = 3 Exercises, GrandSet = +4 Exercise in a Round</div>
                    {/* <button 
                    className="btn btn-outline-success mt-2 col-12" 
                    onClick={handleAddExercise}>
                        Add Exercise
                        </button> */}
                    <button className="btn btn-outlined-primary" onClick={addSet}>Agregar Set</button>
                    <button className="btn btn-outline-success mt-3" onClick={handleSubmit}>Guardar Día</button>
                        
                </div>
            </div>
        </form>    
    );
};


//componentes hijo y lo que se haga ahi se guarde en una lsita en el compnente padre






// import React, { useState, useEffect, useContext } from 'react';
// import { ExcerciseForm } from './ExcerciseForm.jsx';
// import { Context } from '../store/appContext';

// export const DayForm = ({ days, setDays, index, nature }) => {
//     console.log(days);
//     const { store, actions } = useContext(Context);
//     // const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(day.muscle_group || []);

//     // useEffect(() => {
//     //     if (store.muscle_groups.length === 0) {
//     //         actions.getMuscleGroups().catch(error => console.error("Failed to fetch muscle groups", error));
//     //     }
//     // }, [store.muscle_groups.length]);


//     // const handleDayChange = (e) => {
//     //     const updatedDays = [...setDays];
//     //     updatedDays[index] = { ...day, day: e.target.value };
//     //     setDays(updatedDays);
//     // };

//     // // const handleMuscleGroupChange = (e) => {
//     // //     const selectedOptions = Array.from(options)
//     // //     .filter(option => option.selected)
//     // //     .map(option => option.value);
//     // //     const { options } = e.target;
//     // const handleMuscleGroupChange = (e) => {
//     //     const selectedOptions = Array.from(e.target.selectedOptions)
//     //         .map(option => option.value);

//     //     if (selectedOptions.length <= 5){
//     //         setSelectedMuscleGroup(selectedOptions);
//     //         const updatedDays = [...setDays];
//     //         updatedDays[index] = { ...day, muscle_group: selectedOptions };
//     //         setDays(updatedDays);
//     //     }
//     // };

//     // const handleExercisesChange = (newExercises) => {
//     //     console.log("newExercises:", newExercises);
//     //     if (Array.isArray(newExercises)) {
//     //         const updatedDays = [...setDays];
//     //         updatedDays[index] = { ...day, exercises: Array.isArray(newExercises) ? newExercises : [] };
//     //         setDays(updatedDays);
//     //     } else {
//     //         console.error("newExercises is not an array");
//     //     }
//     // };

//     // const addExercise = () => {
//     //     const newExercise = { name: "", sets: 0, reps: 0 };
//     //     const updatedExercises = [...(day.exercises || []), newExercise];
//     //     handleExercisesChange(updatedExercises);
//     // };

//     //made retunr card
//     return (
//         // <div className="card-form day-form my-3 text-light">
//         //     <label htmlFor={`dayName-${index}`}>Day's Name </label>
//         //     <input
//         //         id={`dayName-${index}`}
//         //         type="text"
//         //         placeholder="E.g., Monday"
//         //         value={day.day}
//         //         onChange={handleDayChange}
//         //         className="form-control"
//         //     />
//         <div className='my-3'>
//             <label>Muscle Groups:</label>
//             <div className="d-flex flex-wrap">
//                 {store.muscle_groups.map((group, index) => (
//                     <div key={group.id} className="form-check form-check-inline">
//                         <input
//                             type="checkbox"
//                             className="btn-check"
//                             id={`muscleGroup-${index}`}
//                             value={group.name}
//                             // checked={selectedMuscleGroup.includes(group.name)}
//                             // onChange={handleMuscleGroupChange}
//                             autocomplete="off"
//                         />
//                         <label className="btn" htmlFor={`muscleGroup-${index}`}>
//                             {group.name}
//                         </label>
//                     </div>
//                 ))}
//             </div>
//         //         <div id="muscleGroupHelp" className="form-text">You can select more than one muscular group per day</div>
//         //     </div>
//         //     {(day.exercises || []).map((exercise, exerciseIndex) => (
//         //         <ExcerciseForm
//         //             key={exerciseIndex}
//         //             exercise={exercise}
//         //             setExercises={(updatedExercise) => {
//         //                 const updatedExercises = [...(day.exercise)];
//         //                 updatedExercises[exerciseIndex] = updatedExercise;
//         //                 handleExercisesChange(updatedExercises);
//         //             }}
//         //             index={exerciseIndex}
//         //         />
//         //     ))}
//         //     <button
//         //         className="btn btn-outline-light"
//         //         onClick={addExercise}>Add Exercise</button>
//         // </div>
//     );
// };


// import React, { useState, useEffect, useContext } from 'react';
// import { ExerciseForm } from './ExerciseForm';
// import { Context } from '../store/appContext';

// export const DayForm = ({ day, setDays, index }) => {
//     const { store, actions } = useContext(Context);
//     const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(day.muscle_group);

//     useEffect(() => {
//         // Fetch muscle groups when the component mounts
//         if (store.muscle_groups.length === 0) {
//             actions.fetchMuscleGroups();
//         }
//     }, []);


//     const handleDayChange = (e) => {
//         const updatedDays = [...setDays];
//         updatedDays[index].day = e.target.value;
//         setDays(updatedDays);
//     };

//     const handleMuscleGroupsChange = (e) => {
//         const updatedDays = [...setDays];
//         updatedDays[index].muscle_groups = e.target.value.split(', ');
//         setDays(updatedDays);
//     };

//     const handleExercisesChange = (newExercises) => {
//         const updatedDays = [...setDays];
//         updatedDays[index].exercises = newExercises;
//         setDays(updatedDays);
//     };
//     };

//     return (
//         <div className="day-form">
//             <input
//                 type="text"
//                 placeholder="Day"
//                 value={day.day}
//                 onChange={handleDayChange}
//             />
//             <select value={selectedMuscleGroup} onChange={handleMuscleGroupsChange}>
//                 {store.muscle_groups.map(group => (
//                     <option key={group.Id_musclegroup} value={group.Name}>
//                         {group.Name}
//                     </option>
//                 ))}
//             </select>
//             {day.exercises.map((exercise, exerciseIndex) => (
//                 <ExerciseForm 
//                     key={exerciseIndex} 
//                     exercise={exercise} 
//                     setExercises={(updatedExercise) => {
//                         const updatedDays = [...setDays];
//                         updatedDays[index].exercises[exerciseIndex] = updatedExercise;
//                         setDays(updatedDays);
//                     }}
//                 />
//             ))}
//         </div>
//     );


// import React from 'react';
// import { ExerciseForm } from './ExcerciseForm.jsx';

// export const DayForm = ({ day, setDays, index }) => {
//     const handleDayChange = (e) => {
//         const updatedDays = [...setDays];
//         updatedDays[index].day = e.target.value;
//         setDays(updatedDays);
//     };

//     // Add handlers for muscleGroups and exercises similarly
//     //Make musclegroup drop down. Bring in first the muscle group from store/database
//     //REnderizamos drop down de grupos musculares desde la base de datos y lo guardamos en Day Workout

//     return (
//         <div className="day-form">
//             <input
//                 type="text"
//                 placeholder="Day"
//                 value={day.day}
//                 onChange={handleDayChange}
//             />
//             <input
//                 type="text"
//                 placeholder="Grupo(s) Muscular(es)"
//                 value={muscleGroups.join(', ')}
//                 onChange={(e) => setMuscleGroups(e.target.value.split(', '))}
//             />
//             {day.exercises.map((exercise, index) => (
//                 <ExerciseForm 
//                     key={index} 
//                     exercise={exercise} 
//                     ndex={id} 
//                     />
//             ))}
//         </div>
//     );
// };


//Need to map the exercises on Day form for saving the exercise into the Day.


//LAST CODE

// import React, { useState, useContext } from 'react';
// import { ExerciseForm } from './ExerciseForm';

// const DayForm = ({ day, setDays }) => {
//     const [dayName, setDayName] = useState(day.day);
//     const [muscleGroups, setMuscleGroups] = useState(day.muscleGroups);
//     const [exercises, setExercises] = useState(day.exercises);

//     const addExercise = () => {
//         setExercises([...exercises, { name: '', reps: '', rest_time: '', description: '' }]);
//     };

//     return (
//         <div className="day-form">
//             <select value={dayName} onChange={(e) => setDayName(e.target.value)}>
//                 <option value="Monday">Lunes</option>
//                 <option value="Tuesday">Martes</option>
//                 <option value="Wednesday">Miércoles</option>
//                 <option value="Thursday">Jueves</option>
//                 <option value="Friday">Viernes</option>
//                 <option value="Saturday">Sábado</option>
//                 <option value="Sunday">Domingo</option>
//             </select>
//             <input
//                 type="text"
//                 placeholder="Grupo(s) Muscular(es)"
//                 value={muscleGroups.join(', ')}
//                 onChange={(e) => setMuscleGroups(e.target.value.split(', '))}
//             />
//             {exercises.map((exercise, index) => (
//                 <ExerciseForm key={index} exercise={exercise} setExercises={setExercises} />
//             ))}
//             <button onClick={addExercise}>Agregar Ejercicio</button>
//         </div>
//     );
// };