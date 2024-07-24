import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { DayForm } from "../component/DayForm.jsx";

export const CreateEditPlan = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    const existingWorkout = store.workouts.find(workout => workout.id === id);

    const [workoutName, setWorkoutName] = useState(existingWorkout ? existingWorkout.name : '');
    const [days, setDays] = useState(existingWorkout ? existingWorkout.days : []);
    const [exercise, setExercise] = useState("");

    const addDay = () => {
        setDays([...days, { day: '', muscle_group: '', exercises: [] }]);
    };

    const addExercise = (index) => {
        const updatedDays = [...days];
        updatedDays[index].exercises.push({ name: "", reps: "", sets: "", rest_time: "", description: "" });
        setDays(updatedDays);
    };

    const handleSave = async () => {
        const newWorkout = { id, name: workoutName, days };
        if (id) {
            // Update existing plan
            await actions.updateWorkout(id, newWorkout);
        } else {
            // Create new plan
            await actions.createWorkout(newWorkout);
        }
        navigate('/dashboard');
    };

    return (
            <div className="container mt-5">
                <h1>{id ? 'Edit Workout' : 'Create Workout'}</h1>
                <div className="form-group">
                    <label htmlFor="workoutName">Workout's Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="workoutName"
                        placeholder="Nombre del Plan"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                    />
                </div>
                {days.map((day, index) => (
                    <DayForm 
                        key={index} 
                        day={day} 
                        setDays={setDays} 
                        index={index}
                    />
                ))}
                <button className="btn btn-primary mt-3" onClick={addDay}>Add Day</button>
                {days.map((day, index) => (
                    <button key={index} className="btn btn-secondary mt-2" onClick={() => addExercise(index)}>Add Exercise to Day {index + 1}</button>
                ))}
                <button className="btn btn-success mt-4" onClick={handleSave}>Save Workout</button>
            </div>
    );
};


// import React, { useState, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Context } from '../store/appContext';
// import { DayForm } from "../component/DayForm.jsx";
// //import { ExerciseForm } from "../component/ExerciseForm.jsx";

// export const CreateEditPlan = () => {
//     const { store, actions } = useContext(Context);
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const existingWorkout = store.workouts.find(workout => workout.id === id);

//     const [workoutName, setWorkoutName] = useState(existingWorkout ? existingWorkout.name : '');
//     const [days, setDays] = useState(existingWorkout ? existingWorkout.days : []);
//     const [exercise, setExercise] = useState("");

//     const addDay = () => {
//         setDays([...days, { day: '', muscle_group: '', exercises: [] }]);
//     };

//     const addExercise = (index) => {
//         const updatedDays = [...days];
//         updatedDays[index].exercises.push({ name: "", reps: "", sets: "", rest_time: "", description: "" });
//         setDays(updatedDays);
//     };

//     const handleSave = () => {
//         const newWorkout = { id, name: workoutName, days };
//         if (id) {
//             // Update existing plan
//             actions.updateWorkout(newWorkout);
//         } else {
//             // Create new plan
//             actions.createWorkout(newWorkout);
//         }
//         navigate('/dashboard');
//     };

//     return (
//         <div className= "container mt-5" >
//         <h1>{ id? 'Edit Workout': 'Create Workout' } </h1>
//         < div className = "form-group" >
//             <label htmlFor="workoutName" > Nombre del Plan </label>
//                 < input
//                     type = "text"
//                     className = "form-control"
//     id = "workoutName"
//     placeholder = "Nombre del Plan"
//     value = { workoutName }
//     onChange = {(e) => setWorkoutName(e.target.value)}
//                     />
//     </div>
// {
//     days.map((day, index) => (
//         <DayForm 
//                         key= { index } 
//                         day = { day } 
//                         setDays = { setDays } 
//                         index = { index }
//         />
//                 ))
// }
// <button className="btn btn-primary mt-3" onClick = { addDay } > Add Day </button>
// {
//     days.map((day, index) => (
//         <button key= { index } className = "btn btn-secondary mt-2" onClick = {() => addExercise(index)}> Add Exercise to Day { index + 1 } </button>
//                 ))}
// <button className="btn btn-success mt-4" onClick = { handleSave } > Save Workout </button>
//     </div>
//     );
// };


// import React, { useState, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Context } from '../store/appContext';
// import { DayForm } from "../component/DayForm.jsx";
// import { ExerciseForm } from "../component/ExerciseForm.jsx";

// export const CreateEditPlan = () => {
//     const { store, actions } = useContext(Context);
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const existingWorkout = store.workouts.find(workout => workout.id === id);

//     const [workoutName, setWorkoutName] = useState(existingWorkout ? existingWorkout.name : '');
//     const [exercise, setExercise] = useState("")

//     const addDay = () => {
//         setDays([...days, { day: '', muscleGroups: [], exercises: [] }]);
//     };

//     const addExercise = () => {
//         setExercise([...exercise, {name:"", reps:"", sets:"", rest_time:"", description:""}]);
//     }


//     const handleSave = () => {
//         const newWorkout = {  id, name: workoutName, days };
//             //Flux action POST workout plan. 
//             if (id) {
//                 // Update existing plan
//                 // FLUX ACTION 
//                 //actions.updateWorkout(newWorkout);
//             } else {
//                 // Create new plan
//                 //actions.createWorkout(newWorkout);
//             }
//             navigate('/dashboard');
//         };


//     return (
//         <div>
//             <div className="create-edit-plan">
//                 <h1>{id ? 'Edit Workout' : 'Create Workout'}</h1>
//                 <input
//                     type="text"
//                     placeholder="Nombre del Plan"
//                     value={planName}
//                     onChange={(e) => setWorkoutName(e.target.value)}
//                 />
//                 {days.map((day, index) => (
//                     <DayForm 
//                         key={id} 
//                         day={day} 
//                         setDays={setDays} 
//                         index={index}/>
//                 ))}
//                 <button onClick={addDay}>Add day</button>
//                 <button onClick={handleSave}>Save Workout</button>
//             </div>
//             <ExerciseForm 
//                 key={id} 
//                 exercise={exercise} 
//                 setExercise={setExercise} 
//                 index={index}/>
//             />
//         </div>
//         );
//     };


