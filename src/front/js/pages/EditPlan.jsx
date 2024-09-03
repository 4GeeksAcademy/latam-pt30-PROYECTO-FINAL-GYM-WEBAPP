import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { DayForm } from '../component/DayForm.jsx';

const EditPlan = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [workout, setWorkout] = useState({});
    const [muscles, setMuscles] = useState({})
    
    const navigate = useNavigate();


    // Find the existing workout by id if it exists
    useEffect(() => {
        const existingWorkout = store.workouts.find(workout => workout.id === id);
        //const planInStore = store.workouts
        const muscleGroups = store.muscle_groups
        setWorkout(existingWorkout);
       // setWorkout(planInStore)
        setMuscles(muscleGroups)
    }, [store.workouts, id]);
    console.log(workout.name)

    const handleWorkoutNameChange = (e) => {
        setWorkout({ ...workout, name: e.target.value || workout.name });
    };

    const handleSave = () => {
        actions.updateWorkout(workout.id, workout);
        navigate("/Dashboard")
    };

    if (!workout) return <div>Loading...</div>;

    return (
        <div className="card border-success m-4 p-5 text-light mb-5 pb-5">
            <span
                className="p-3"
                onClick={() => navigate(`/dashboard`)}
                >
                    <i className="fa-solid fa-circle-chevron-left fs-1"></i>
            </span>
            <h1> Edit Workout</h1>
            <div className="form-group">
                <label htmlFor="workoutName">Workout's Name</label>
                <input
                    type="text"
                    className="form-control border-primary-subtle"
                    id="workoutName"
                    name="name"
                    placeholder="Eje: Hypertrophy Workout"
                    value={workout.name}
                    onChange={handleWorkoutNameChange}
                />
            </div>
            {workout?.days?.map((day, index) => (
                    <DayForm
                        key={index}
                        day={day}
                        muscles={muscles}
                        onSave={(updatedDay) => handleSave(updatedDay, index)}
                    />
                ))}
                <button className="btn btn-primary mt-3 mb-5" onClick={handleSave}>Save Workout</button>
        </div>
    );
};


export default EditPlan



//Working basic edit plan

// const EditPlan = () => {
//     const { store, actions } = useContext(Context);
//     const { id } = useParams();
//     const [workout, setWorkout] = useState({})
//     const navigate = useNavigate();


//     // Find the existing workout by id if it exists
//     const existingWorkout = () => {
//         const searchWorkout = store.workouts.find(workout => workout.id === id);

//         setWorkout(searchWorkout)

//     }

//     console.log(workout.days)


//     useEffect(() => {
//         existingWorkout()
//     }, [])


//     return (
//         <div className="card border-success m-4 p-5 text-light">
//             <h1> Edit Workout</h1>
//             <div className="form-group">
//                 <label htmlFor="workoutName">Workout's Name</label>
//                 <input
//                     type="text"
//                     className="form-control"
//                     id="workoutName"
//                     name="name"
//                     placeholder="Eje: Hypertrophy Workout"
//                     value={workout.name}
//                     onChange={(e) => setWorkout(e.target.value)}
//                 />
//             </div>
//             {
//                 workout.days?.map((day, index) => (
//                     <DayForm
//                         key={index}
//                         days={day}
//                         index={index}
//                         nature="edit"
//                         setDays={(updatedDays) => {
//                             const newDays = [...workout.days];
//                             newDays[index] = updatedDays[index];
//                             setWorkout({ ...workout, days: newDay });
//                             navigate("/Dashboard")    
//                         }}
//                     />
//                 ))
//             }
//             {/* {days && days.length > 0 && days.map((day, index) => (
//                 <DayForm
//                     key={index}
//                     day={day}
//                     setDays={(updatedDays) => {
//                         const newDays = [...days];
//                         newDays[index] = updatedDays[index];
//                         setDays(newDays);
//                     }}
//                     index={index}
//                 />
//             ))} */}
//         </div>
//     )
// }


// export default EditPlan