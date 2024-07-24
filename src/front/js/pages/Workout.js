import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Timer from "../component/Timer";
import { Context } from "../store/appContext";
export const Workout = () => {
  const { store } = useContext(Context);
  const [exercise, setExercise] = useState(null);
  const [completedSets, setCompletedSets] = useState([]);
  const [startTimer, setStartTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const params = useParams();


  useEffect(() => {
    if (params.name && store.workouts.length > 0) {
      const workout = store.workouts.find(w => w.id == params.workoutId);
      if (workout) {
        const ex = workout.days[params.dayId].exercises.find(e => e.name === params.name);
        setExercise(ex);
        setCompletedSets(Array(ex.sets).fill(false));
      }
    }
  }, [params.name, store.workouts]);


  if (!exercise) {
    return <div>No exercise data available. Please go back to the workouts list.</div>;
  }


  const toggleSetCompletion = (index) => {
    const updatedSets = [...completedSets];
    if (!updatedSets[index]) {
      // Solo activar el cronómetro si la serie no estaba completada antes
      updatedSets[index] = true;
      setResetTimer(true);
      setStartTimer(false);
      setTimeout(() => setStartTimer(true), 50);
    } else {
      updatedSets[index] = false;
    }
    setCompletedSets(updatedSets);
  };


  return (
    <div className="container my-5">
      <div className="alert rounded-5 bg-light opacity-75 col-11">
        <div className="d-flex justify-content-center">
          <h1 style={{ color: 'black' }}>{exercise.name} </h1>
        </div>
        <div className="exercise-details">
          {exercise.reps} REPS | {exercise.sets} SETS | {exercise.description}</div>
      </div>
        <div id="exerciseDetails" className="workout-details">
          <div className="sets">
            {completedSets.map((completed, i) => (
              <div key={i} className="set-container">
                <button onClick={() => toggleSetCompletion(i)} 
                className={`set-btn ${completed ? 'completed' : ''}`}>
                  {completed ? "" : ""}
                 <span className="set-number d-flex justify-content-center">{i + 1}</span>  
                </button>
              </div>
            ))}
          </div>
            <Timer startTimer={startTimer} resetTimer={resetTimer} />
        </div>
    </div>
  );
};
