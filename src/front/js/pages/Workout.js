import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Timer } from "../component/Timer.js";
import { Context } from "../store/appContext";


export const Workout = () => {
  const { store } = useContext(Context);
  const [exercise, setExercise] = useState(null);
  const [sets, setSets] = useState([]);
  const [completedSets, setCompletedSets] = useState([]);
  const [startTimer, setStartTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const params = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    if (store.workouts.length > 0) {
      const workout = store.workouts.find(w => w.id == params.workoutId);

      const searchSets = workout.days?.find(day => params.dayId == day.day.id).sets?.find(set => params.setId == set.id);

      console.log("Sets", searchSets);

      if (searchSets) {
        setSets(searchSets);
      }

      if (workout) {
        const ex = workout.days?.find(day => params.dayId == day.day.id).sets?.map(set => set.exercises.map(item => {
          item["type"] = set.type
          return item
        }))
          .flat().find(e => e.name === params.name);
        console.log(ex);

        setExercise(ex);
      }
    }
  }, [params.name, store.workouts]);


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

  return (
    <div className="container my-5">
      <span
        className="p-3 mb-3"
        onClick={() => navigate(`/dashboard`)}
      >
        <i className="fa-solid fa-circle-chevron-left fs-1 m-3"></i>
      </span>
      {
        sets && sets.exercises && sets.exercises.map((exerci, index) => {
          return <div key={index} className="alert rounded-5 bg-light border-danger-subtle opacity-75 mx-auto">
            <div className="d-flex justify-content-center text-dark">
              <h1> {exerci.name} </h1>
            </div>
            <div className="exercise-details text-dark d-flex justify-content-center">

              {exerci.reps} REPS | {exerci.rounds} ROUNDS | {exerci.type}
            </div>
            <small>{exerci.description}</small>
            <div id="exerciseDetails" className="workout-details d-flex flex-column align-items-center">
            </div>
          </div>
        })}

      <div className="d-flex flex-column justify-content-center align-items-center w-full">
        <h4>Rounds</h4>
        <div className="rounds d-flex">
          {Array.from(Array(10).keys()).map((round, roundIndex) => (
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
            </div>
          ))}
        </div>
        <Timer />
      </div>
    </div>
  );
};
