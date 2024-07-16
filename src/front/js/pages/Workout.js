import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Timer from "../component/Timer";
import { Context } from "../store/appContext"; 

export const Workout = () => {
  const { store } = useContext(Context);
  const location = useLocation();
  const exerciseName = location.state ? location.state.exercise.name : null;
  const [exercise, setExercise] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [completedSets, setCompletedSets] = useState([]);
  const [startTimer, setStartTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    if (exerciseName && store.workouts.length > 0) {
      const workout = store.workouts.find(w => w.exercises.some(e => e.name === exerciseName));
      if (workout) {
        const ex = workout.exercises.find(e => e.name === exerciseName);
        setExercise(ex);
        setCompletedSets(Array(ex.sets).fill(false));
      }
    }
  }, [exerciseName, store.workouts]);

  if (!exercise) {
    return <div>No exercise data available. Please go back to the workouts list.</div>;
  }

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const toggleSetCompletion = (index) => {
    const updatedSets = [...completedSets];
    if (!updatedSets[index]) {
      // Solo activar el cronómetro si la serie no estaba completada antes
      updatedSets[index] = true;
      setResetTimer(true);
      setStartTimer(false); // Desactiva el temporizador para reiniciar
      setTimeout(() => setStartTimer(true), 50); // Activa el temporizador después de un pequeño retraso
    } else {
      updatedSets[index] = false; // Desmarcar la serie sin activar el cronómetro
    }
    setCompletedSets(updatedSets);
  };

  return (
    <div className="container my-5">
      <button
        className="alert rounded-5 bg-light opacity-75 col-11"
        type="button"
        onClick={toggleDetails}
        aria-expanded={isOpen}
        aria-controls="exerciseDetails"
      >
        <div className="d-flex justify-content-center">
          <h1 style={{ color: 'black' }}>{exercise.name}</h1>
        </div>
      </button>
      {isOpen && (
        <div id="exerciseDetails" className="workout-details">
          <p className="exercise-details">{exercise.reps} REPS | {exercise.sets} SETS</p>
          <div className="sets">
            {completedSets.map((completed, i) => (
              <div key={i} className="set-container">
                <span className="set-number">{i + 1}</span>
                <button onClick={() => toggleSetCompletion(i)} className={`set-btn ${completed ? 'completed' : ''}`}>
                  {completed ? "✔" : ""}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <Timer startTimer={startTimer} resetTimer={resetTimer} />
    </div>
  );
};
