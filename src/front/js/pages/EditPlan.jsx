import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { DayForm } from '../component/DayForm.jsx';

const EditPlan = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [workout, setWorkout] = useState({});
    const [days, setDays] = useState([]);
    const [muscles, setMuscles] = useState({})
    const navigate = useNavigate();

    // Cargar el workout al iniciar
    useEffect(() => {
        const existingWorkout = store.workouts.find(w => w.id === id);
        if (existingWorkout) {
            setWorkout(existingWorkout);
            setDays(existingWorkout.days || []);
        }
        setMuscles(store.muscle_groups);
    }, [store.workouts, id]);

    // const [day, setDay] = useState(
    //     {
    //         day: "",
    //         muscle_group: [
    //             { name: "" },
    //             { name: "" }
    //         ],
    //         exercises: [
    //             { name: "", reps: "", sets: "", rest_time: "", description: "", super_set:"" },
    //         ],
    //     },
    // );

    const handleAddDay = async () => {
        const updatedWorkout = { ...workout, days: days };
        setDays([...days, { day: "", muscle_group: [{ id: "", name: "" }], exercises: [{ name: "", reps: "", sets: "", rest_time: "", description: "", super_set:"" }] }]);
        actions.updateWorkout(workout.id, updatedWorkout);
    };
    // const handleAddDay = () => {
    //     const newDay = {
    //         id: Math.random().toString(36).substr(2, 9), // Generar un id temporal único
    //         day: "",
    //         muscle_group: [{ id: "", name: "" }],
    //         exercises: [{ id: "", name: "", reps: "", sets: "", rest_time: "", description: "", super_set: "" }],
    //     };
    //     setDays([...days, newDay]);
    // };

    // useEffect(() => {
    //     const existingWorkout = store.workouts.find(workout => workout.id === id);
    //     if (existingWorkout) {
    //         setWorkout({
    //             ...existingWorkout,
    //             days: existingWorkout.days || [], // Asegúrate de que `days` esté presente
    //         });
    //     }
    //     setMuscles(store.muscle_groups);
    // }, [store.workouts, id]);
   

    // const handleWorkoutNameChange = (e) => {
    //     setWorkout({ ...workout, name: e.target.value || workout.name });
    // };

    const handleSaveWorkout = async () => {
        const updatedWorkout = { ...workout, days: days };
        actions.updateWorkout(workout.id, updatedWorkout);
        //navigate('/dashboard');
    };

    //if (!workout) return <div>Loading...</div>;

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
                    value={workout.name || ""}
                    onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
                />
            </div>
            {days?.map((day) => (
                    <div key={day.id}>
                    <DayForm
                        day={day}
                        muscles={muscles}
                        setDays={setDays}
                        onSave={(updatedDay) => {
                            const newDays = [...days];
                            newDays[index] = updatedDay;
                            setDays(newDays);
                        }} />
                    {/* Botón para agregar un nuevo ejercicio */}
                    {/* <button
                        className="btn btn-secondary mt-3"
                        onClick={() => handleAddExercise(day.id)}
                    >
                        Agregar Ejercicio
                    </button>
            
                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => handleSaveDay(day.id)}
                    >
                        Guardar Día
                    </button> */}
                </div>
            ))}

                {/* Botón para agregar un nuevo día */}
                <button
                    className="btn btn-outline-warning mt-3 mb-5"
                    onClick={handleAddDay}
                >
                    Add Day
                </button>

                {/* Botón para guardar el workout completo */}
                <button 
                    className="btn btn-primary fixed-bottom mt-3 mb-5 col-9 m-auto" 
                    onClick={handleSaveWorkout}>
                        Save Changes
                        </button>
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