import React, { useState, useEffect, useContext } from 'react';
import { ExcerciseForm } from './ExcerciseForm.jsx';
import { Context } from '../store/appContext';

export const DayForm = ({ day, setDays, index }) => {
    const { store, actions } = useContext(Context);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(day.muscle_group);

    useEffect(() => {
        if (store.muscle_groups.length === 0) {
            actions.fetchMuscleGroups();
        }
    }, [store.muscle_groups.length, actions]);

    const handleDayChange = (e) => {
        const updatedDays = [...setDays];
        updatedDays[index].day = e.target.value;
        setDays(updatedDays);
    };

    const handleMuscleGroupChange = (e) => {
        const updatedDays = [...setDays];
        updatedDays[index].muscle_group = e.target.value;
        setDays(updatedDays);
    };

    const handleExercisesChange = (newExercises) => {
        const updatedDays = [...setDays];
        updatedDays[index].exercises = newExercises;
        setDays(updatedDays);
    };

    return (
        <div className="day-form">
            <input
                type="text"
                placeholder="Day"
                value={day.day}
                onChange={handleDayChange}
            />
            <select value={selectedMuscleGroup} onChange={handleMuscleGroupChange}>
                {store.muscle_groups.map(group => (
                    <option key={group.Id_musclegroup} value={group.Name}>
                        {group.Name}
                    </option>
                ))}
            </select>
            {day.exercises.map((exercise, exerciseIndex) => (
                <ExcerciseForm 
                    key={exerciseIndex} 
                    exercise={exercise} 
                    setExercises={(updatedExercise) => {
                        const updatedExercises = [...day.exercises];
                        updatedExercises[exerciseIndex] = updatedExercise;
                        handleExercisesChange(updatedExercises);
                    }} 
                />
            ))}
        </div>
    );
};


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