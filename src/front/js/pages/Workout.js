import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Timer } from "../component/Timer.js";
import { Context } from "../store/appContext";


export const Workout = () => {
  const { store } = useContext(Context);
  const [exercise, setExercise] = useState(null);
  const [completedSets, setCompletedSets] = useState([]);
  const [startTimer, setStartTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const params = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    if (params.name && store.workouts.length > 0) {
      const workout = store.workouts.find(w => w.id == params.workoutId);
      //console.log(workout);
      
      if (workout) {
        const ex = workout.days?.find(day => params.dayId == day.day.id).sets?.map(set => set.exercises.map(item => {
          item["type"] = set.type
          return item
      }))
      .flat().find(e => e.name === params.name);
        console.log(ex);
        
        setExercise(ex);
        setCompletedSets(Array(ex.rounds).fill(false));
      }
    }
  }, [params.name, store.workouts]);

  

  if (!exercise) {
    return <div>No exercise data available. Please go back to the workouts list.</div>;
  }


  const toggleSetCompletion = (roundIndex, setIndex) => {
    const updatedSets = [...completedSets];
    if (!updatedSets[roundIndex][setIndex]) {
      // Marcar como completado y reiniciar el cronómetro solo si el set no estaba completado
      updatedSets[roundIndex][setIndex] = true;
      setResetTimer(true);
      setStartTimer(false);
      setTimeout(() => setStartTimer(true), 50); // Reinicia el cronómetro
    } else {
      updatedSets[roundIndex][setIndex] = false; // Desmarcar como incompleto
    }
    setCompletedSets(updatedSets);
  };

console.log(completedSets);

  return (
    <div className="container my-5">
      <span
          className="p-3 mb-3"
          onClick={() => navigate(`/dashboard`)}
          >
              <i className="fa-solid fa-circle-chevron-left fs-1 m-3"></i>
      </span>
      <div className="alert rounded-5 bg-light border-danger-subtle opacity-75 mx-auto">
        <div className="d-flex justify-content-center text-dark">
          <h1> {exercise.name} </h1>
        </div>
        <div className="exercise-details text-dark d-flex justify-content-center">
        
          {exercise.reps} REPS | {exercise.rounds} ROUNDS | {exercise.type}</div>
          <small>{exercise.description}</small>
      </div>
        <div id="exerciseDetails" className="workout-details d-flex flex-column align-items-center">
          <h4>Rounds</h4>
          <div className="rounds d-flex">
            {completedSets.map((round, roundIndex) => (
              <div key={roundIndex} className="mx-1">
                <div>
                    <div>
                      <button 
                      onClick={() => toggleSetCompletion(roundIndex, roundIndex)} 
                      className={`btn btn-success btn-lg ${round ? 'completed' : ''}`}>
                        {round ? <i className="fa fa-check"></i> : <span className="set-number">{roundIndex + 1}</span>}
                      </button>
                    </div>
                </div>
                {/* <button 
                onClick={() => toggleSetCompletion(i)} 
                className={`btn btn-success btn-lg ${completed ? 'completed' : ''}`}>
                  {completed ? "" : ""}
                 <span className="set-number d-flex ">{i + 1}</span>  
                </button> */}
              </div>
            ))}
          </div>
            <Timer 
            startTimer={startTimer} 
            resetTimer={resetTimer} 
            
            />
        </div>
    </div>
  );
};
