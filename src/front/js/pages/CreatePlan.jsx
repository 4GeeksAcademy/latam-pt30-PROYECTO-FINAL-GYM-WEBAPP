import React, { useState, useContext, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { DayForm } from "../component/DayForm.jsx";

export const CreatePlan = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    // Estado del nombre del workout
    const [workoutName, setWorkoutName] = useState('');
    // Estado para gestionar los días dentro del workout
    const [days, setDays] = useState([{
        day: "",
        muscle_group: [{ id: "", name: "" }],
        exercises: [{ name: "", reps: "", sets: "", rest_time: "", description: "", super_set:"" }],
    }]);

    // Función para agregar un nuevo día vacío
    const handleAddDay = async () => {
        const newWorkout = { name: workoutName, days: days };
        setDays([...days, { day: "", muscle_group: [{ id: "", name: "" }], exercises: [{ name: "", reps: "", sets: "", rest_time: "", description: "", super_set:"" }] }]);
        actions.createWorkout(newWorkout);
    };

    const handleSaveWorkout = async () => {
        const newWorkout = { name: workoutName, days: days };
        actions.createWorkout(newWorkout);
        //navigate('/dashboard');
    };


    // Grupos musculares hardcoded (ya que son solo 12 y no cambiarán)
    const muscleGroups = [
        { id: 1, name: "Chest" },
        { id: 2, name: "Back" },
        { id: 3, name: "Legs" },
        { id: 4, name: "Shoulders" },
        { id: 5, name: "Biceps" },
        { id: 6, name: "Triceps" },
        { id: 7, name: "Abs" },
        { id: 8, name: "Calves" },
        { id: 9, name: "Glutes" },
        { id: 10, name: "Forearms" },
        { id: 11, name: "Traps" },
        { id: 12, name: "Hamstrings" },
    ];


    return (
        <div className="card border-success m-4 p-5 text-light">
            <span
                className="p-3"
                onClick={() => navigate(`/dashboard`)}
                >
                    <i className="fa-solid fa-circle-chevron-left fs-1"></i>
            </span>
            <h1>Create Workout</h1>


            <div className="form-group">
                <label htmlFor="workoutName">Workout Name</label>
                <input
                    type="text"
                    className="form-control border-primary-subtle"
                    id="workoutName"
                    placeholder="Eje: Hypertrophy Workout"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                />
            </div>


            {days.map((day, index) => (
                <DayForm
                    key={index}
                    day={day}
                    muscles={muscleGroups}
                    onSave={(updatedDay) => {
                        // Actualiza el día correspondiente en el array de días
                        const newDays = [...days];
                        newDays[index] = updatedDay;
                        setDays(newDays);
                    }}
                />
            ))}

                <button 
                className="btn btn-outline-warning mt-4 mb-5"
                onClick={handleAddDay}>Add Day</button>
                <button 
                className="btn btn-primary mt-4 fixed-bottom mb-5 col-9 m-auto"
                onClick={handleSaveWorkout}>Save Changes</button>
        </div>
    );
};



/* <div className="card border-success m-4 p-5 text-light">
            <h1>{id ? 'Edit Workout' : 'Create Workout'}</h1>
            <div className="form-group">
                <label htmlFor="workoutName">Workout's Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="workoutName"
                    placeholder="Eje: Hypertrophy Workout"
                    // value={workoutName}
                    // onChange={(e) => setWorkoutName(e.target.value)}
                />
            </div>
            {days && days.length > 0 && days.map((day, index) => (
                <DayForm
                    key={index}
                    day={day}
                    setDays={(updatedDays) => {
                        const newDays = [...days];
                        newDays[index] = updatedDays[index];
                        setDays(newDays);
                    }}
                    index={index}
                />
            ))}
            <button
                className="btn btn-primary mt-3"
                onClick={addDay}>Add a Day
            </button>
            {/* <div>
                    <button 
                    key={`add-exercise-${index}`} 
                    className="btn btn-secondary mt-2" 
                    onClick={() => addExercise(index)}>
                        Add Exercises to Day {index + 1}
                    </button>
                </div> 
        <div>
            <button
                className="btn btn-success mt-4"
                onClick={handleSave}>Save Workout
            </button>
        </div>
</div> */


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
//     };null

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


