import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Timer from "../component/Timer";
import { Context } from "../store/appContext"; // Importa el contexto de Flux

//1. import { Context } from "../store/appContext"; // Importa el contexto de Flux FM

// COMENTARIOS DE FLUJO GENERAL DE FUNCIONALIDAD
// 1. Estructura data kevin en MyWorkoutOut - 
//La data se necesita traer como estado global desde flux,
// pudes ver lo necesario comentado en esta misma vista 1 - 1.1
//Data que se cosumio desde vista MyWorkOut...
// const data = [
//     {
//       day: "Day 1",
//       muscle_group: "Leg",
//       exercises: [
//         { name: "Pullups", reps: 10, sets: 3 },
//         { name: "Pushups", reps: 15, sets: 3 },
//         { name: "Bar", reps: 20, sets: 3 },
//       ]
//     },
//     {
//       day: "Day 2",
//       muscle_group: "Arm",
//       exercises: [
//         { name: "Pullups", reps: 10, sets: 3 },
//         { name: "Pushups", reps: 15, sets: 3 },
//         { name: "Bar", reps: 20, sets: 3 },
//         { name: "Peckfly", reps: 12, sets: 3 }
//       ]
//     }
//   ];
// 2. La estructura difiere un poco a la que se necesita para la logia futura de las proximas vistas, 
//se muestra igualmente en flux.
// 3. El tiempo para el coronometro == a nuestro actual parametro en .store - rest_time.

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
    updatedSets[index] = !updatedSets[index];
    setCompletedSets(updatedSets);
    
    // Reiniciar y activar el temporizador
    setResetTimer(true);
    setStartTimer(false); // Desactiva el temporizador para reiniciar
    setTimeout(() => setStartTimer(true), 50); // Activa el temporizador después de un pequeño retraso
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
          <p>{exercise.reps} reps | {exercise.sets} sets</p>
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
          <Timer startTimer={startTimer} resetTimer={resetTimer} />
        </div>
      )}
    </div>
  );
};