import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { DayForm } from '../component/DayForm.jsx';

const EditPlan = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [workout, setWorkout] = useState({})



    // Find the existing workout by id if it exists
    const existingWorkout = () => {
        const searchWorkout = store.workouts.find(workout => workout.id === id);

        setWorkout(searchWorkout)

    }

    console.log(workout.days)


    useEffect(() => {
        existingWorkout()
    }, [])


    return (
        <div className="card border-success m-4 p-5 text-light">
            <h1> Edit Workout</h1>
            <div className="form-group">
                <label htmlFor="workoutName">Workout's Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="workoutName"
                    name="name"
                    placeholder="Eje: Hypertrophy Workout"
                    value={workout.name}
                    onChange={(e) => setWorkout(e.target.value)}
                />
            </div>
            {
                workout.days?.map((day, index) => (
                    <DayForm
                        key={index}
                        days={day}
                        index={index}
                        nature="edit"
                        setDays={(updatedDays) => {
                            const newDays = [...workout.days];
                            newDays[index] = updatedDays[index];
                            setWorkout({ ...workout, days: newDay });
                            Navigate("/Dashboard")    
                        }}
                    />
                ))
            }
            {/* {days && days.length > 0 && days.map((day, index) => (
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
            ))} */}
        </div>
    )
}


export default EditPlan