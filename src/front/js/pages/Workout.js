import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Timer from "../component/Timer";

export const Workout = () => {
  const location = useLocation();
  const exercise = location.state ? location.state.exercise : null;
  const [isOpen, setIsOpen] = useState(false);
  const [completedSets, setCompletedSets] = useState(Array(exercise ? exercise.sets : 0).fill(false)); // Estado para manejar las series completadas
  const [startTimer, setStartTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

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
    setStartTimer(true);
    setResetTimer(false);
  };

  useEffect(() => {
    if (startTimer) {
      const timer = setTimeout(() => {
        setStartTimer(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [startTimer]);

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


/* 
  Comentario sobre el código anterior:
  El código anterior se maneja sin verificar si el objeto "exercise" está presente o no, lo que podría llevar a errores 
  si el estado se pierde (por ejemplo, en una recarga de la página). Mantengo este código aquí comentado para posiblemente 
  reutilizar algunas de sus partes más adelante cuando aseguremos mejor la persistencia del estado entre recargas.

import React from "react";
import { useLocation } from "react-router-dom";
import Timer from "../component/Timer";

export const Workout = () => {
  const location = useLocation();
  const { exercise } = location.state;

  return (
    <div className="container my-5">
      <h1 className="text-center">Today's Routine</h1>
      <div className="exercise-details">
        <h3>{exercise.name}</h3>
        <p>{exercise.reps} REPS</p>
        <div className="sets">
          {Array(exercise.sets).fill().map((_, i) => (
            <button key={i} className="set-btn">
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <Timer />
    </div>
  );
};
*/
