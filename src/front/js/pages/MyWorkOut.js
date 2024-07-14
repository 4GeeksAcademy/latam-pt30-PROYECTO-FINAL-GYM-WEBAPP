import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const MyWorkOut = () => {
  const { store, actions } = useContext(Context);

  const data = [
    {
      day: "Day 1",
      muscle_group: "Leg",
      exercises: [
        { name: "Pullups", reps: 10, sets: 3 },
        { name: "Pushups", reps: 15, sets: 3 },
        { name: "Bar", reps: 20, sets: 3 },
      ]
    },
    {
      day: "Day 2",
      muscle_group: "Arm",
      exercises: [
        { name: "Pullups", reps: 10, sets: 3 },
        { name: "Pushups", reps: 15, sets: 3 },
        { name: "Bar", reps: 20, sets: 3 },
        { name: "Peckfly", reps: 12, sets: 3 }
      ]
    }
  ];

  const navigate = useNavigate();

  const handleExerciseClick = (exercise) => {
    navigate(`/workout/${exercise.name}`, { state: { exercise } });
  };

  return (
    <div>
      <div className="d-flex flex-column">
        <h1 className="d-flex justify-content-center m-4">TODAY'S WORKOUT</h1>
        {data.map((item, index) => (
          <div key={index}>
            <button
              className="alert rounded-5 bg-light opacity-75 col-11"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapseWidthExample-" + index}
              aria-expanded="false"
              aria-controls="collapseWidthExample"
            >
              <div className="d-flex justify-content-center">
                <div>
                  <span className="text-warning">{item.day}</span>
                  <h4 className="text-dark fw-bold">{item.muscle_group}</h4>
                </div>
                <small className="text-dark">{item.exercises.length}</small>
              </div>
            </button>
            <div className="col-12">
              <div className="collapse collapse-horizontal" id={"collapseWidthExample-" + index}>
                <div className="alert rounded-5 bg-light text-dark opacity-75 col-11">
                  {item.exercises.map((exercise, i) => (
                    <div key={i} className="cursor-pointer" onClick={() => handleExerciseClick(exercise)}>
                      {exercise.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
