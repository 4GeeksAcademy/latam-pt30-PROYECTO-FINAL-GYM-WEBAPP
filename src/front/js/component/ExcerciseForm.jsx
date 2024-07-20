import React, { useState, useEffect } from 'react';

export const ExcerciseForm = ({ exercise, setExercises, index }) => {
    const [formState, setFormState] = useState({
        name: exercise.name,
        reps: exercise.reps,
        sets: exercise.sets,
        rest_time: exercise.rest_time,
        description: exercise.description,
    });

    useEffect(() => {
        const updatedExercise = { ...formState };
        setExercises(prevExercises => {
            const newExercises = [...prevExercises];
            newExercises[index] = updatedExercise;
            return newExercises;
        });
    }, [formState, index, setExercises]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="exercise-form">
            <input
                type="text"
                name="name"
                placeholder="Exercise Name"
                value={formState.name}
                onChange={handleChange}
            />
            <input
                type="number"
                name="reps"
                placeholder="Reps"
                value={formState.reps}
                onChange={handleChange}
            />
            <input
                type="number"
                name="sets"
                placeholder="Sets"
                value={formState.sets}
                onChange={handleChange}
            />
            <input
                type="number"
                name="rest_time"
                placeholder="Resting Time"
                value={formState.rest_time}
                onChange={handleChange}
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={formState.description}
                onChange={handleChange}
            />
        </div>
    );
};

// import React, { useState, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Context } from '../store/appContext';


// export const ExerciseForm = ({ exercise, setExercises, index }) => {
//     const [name, setName] = useState(exercise.name);
//     const [reps, setReps] = useState(exercise.reps);
//     const [sets, setSets] = useState(exercise.sets);
//     const [restTime, setRestTime] = useState(exercise.rest_time);
//     const [description, setDescription] = useState(exercise.description);

//     const hadnleUpdate

//     return (
//         <div className="exercise-form">
//             <input
//                 type="text"
//                 placeholder="Exercise Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//             />
//             <input
//                 type="number"
//                 placeholder="Reps"
//                 value={reps}
//                 onChange={(e) => setReps(e.target.value)}
//             />
//             <input
//                 type="number"
//                 placeholder="Sets"
//                 value={reps}
//                 onChange={(e) => setSets(e.target.value)}
//             />
//             <input
//                 type="number"
//                 placeholder="Resting Time"
//                 value={restTime}
//                 onChange={(e) => setRestTime(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//             />
//         </div>
//     );
// };

//HandleSetExercise
//Set exercise con onclick
//lo tenemos que hacer aqui o en el componente DayForm?



//Create a logic as addExercise for exercises and take that to Create Edit excercise
// const addDay = () => {
//     setDays([...days, { day: '', muscleGroups: [], exercises: [] }]);