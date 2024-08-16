import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
                    placeholder="Eje: Hypertrophy Workout"
                    value={workout.name}
                // onChange={(e) => setWorkoutName(e.target.value)}
                />
            </div>
            {
                workout.days?.map((item, index) => (
                    <DayForm
                        key={item.id}
                        days={item}
                        nature="edit"
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