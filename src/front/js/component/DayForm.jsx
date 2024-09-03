import React, { useState } from 'react';
import { ExcerciseForm } from './ExcerciseForm.jsx';
//import { Context } from '../store/appContext.js';


export const DayForm = ({ day, muscles, onSave }) => {
    // Initialize form state with provided day data or defaults
    const [formState, setFormState] = useState(day || { name: '', muscle_group: []});

    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(muscles || []);
    const [exercises, setExercises] = useState(day?.exercises || []);

    // Handle input changes
    const handleChange = ({ tarjet: {name, value} }) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle muscle group selection
    const handleMuscleGroupChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedMuscleGroups([...selectedMuscleGroups, value]);
        } else {
            setSelectedMuscleGroups(selectedMuscleGroups.filter(group => group !== value));
        }
    };

    const handleAddExercise = () => {
        setExercises([...exercises, { name: '', reps: '', sets: '', rest_time: '', description: '', super_set:'' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formState); // Pass the updated day back to parent
    };

    const handleSave = () => {
        onSave({ ...day, muscleGroups: selectedMuscleGroups, exercises });
    };

    console.log(muscles);
    
    console.log(day);
    
    return (
        <form className="day-form p-3" onSubmit={handleSubmit}>
            <h5>Day: </h5>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Day Name"
                    value={formState.day}
                    onChange={handleChange}
                />
            </div>
            <div className="day-form">
                <div className='my-3'>
                    <h5>Muscle Groups:</h5>
                    <div className="d-flex flex-wrap">
                        {muscles.map((group, index) => (
                            <div key={group.index} className="form-check form-check-inline">
                                <input
                                    type="checkbox"
                                    className="btn-check"
                                    id={`muscleGroup-${index}`}
                                    value={group.name}
                                    checked={selectedMuscleGroups.includes(group.name)}
                                    onChange={handleMuscleGroupChange}
                                    autoComplete="off"
                                />
                                <label className="btn" htmlFor={`muscleGroup-${index}`}>
                                    {group.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div id="muscleGroupHelp" className="form-text">You can select more than one muscular group per day</div>
                </div>
                {/* <button className="btn btn-outline-primary mt-3" onClick={handleSave}>Save Day</button> */}
                <div className="exercises-section">
                    <h4>Exercises</h4>
                    {day?.exercises?.map((exercise, index) => (
                        <ExcerciseForm
                            key={index}
                            exercise={exercise}
                            setExercises={setExercises}
                            index={index}
                        />
                    ))}
                    <button className="btn btn-secondary mt-2" onClick={handleAddExercise}>Add Exercise</button>
                </div>

                <button className="btn btn-secondary mt-3" onClick={handleSave}>Save Day</button>
            </div>
        </form>    
    );
};









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