import React, { useState } from "react";
import { ExerciseForm } from "./ExcerciseForm.jsx";

export const Sets = ({ set, updateSet, removeSet }) => {
    const [exercises, setExercises] = useState(set.exercises || []);

    // Determinar el número máximo de ejercicios según el tipo de set
    const maxExercises = (() => {
        switch (set.type) {
            case 'SuperSet': return 2;
            case 'TriSet': return 3;
            case 'GrandSet': return 8;
            default: return 1;
        }
    })();

    // Controlar el número de ejercicios permitidos
    const addExercise = () => {
        if (exercises.length < maxExercises) {
            setExercises([...exercises, { id: Date.now(), name: "", reps: 0, rounds: 0 }]);
        } else {
            alert(`Solo puedes agregar hasta ${maxExercises} ejercicios para un ${set.type}`);
        }
    };

    // Actualizar los ejercicios y el set al cambiar
    const updateExercise = (id, updatedExercise) => {
        const updatedExercises = exercises.map(ex => ex.id === id ? updatedExercise : ex);
        setExercises(updatedExercises);
        updateSet({ ...set, exercises: updatedExercises });
    };

    const removeExercise = (id) => {
        const updatedExercises = exercises.filter(ex => ex.id !== id);
        setExercises(updatedExercises);
        updateSet({ ...set, exercises: updatedExercises });
    };

    // Efecto para actualizar el set cuando cambian los ejercicios
    useEffect(() => {
        updateSet({ ...set, exercises });
    }, [exercises]);

    return (
        <div className="set-container mb-4">
            <h4>Set {set.id} - {set.type}</h4>
            <button 
                className="btn btn-danger btn-sm mb-2" 
                onClick={() => removeSet(set.id)}
            >Eliminar Set
            </button>
            
            {exercises.map(exercise => (
                <ExerciseForm
                    key={exercise.id}
                    exercise={exercise}
                    updateExercise={updateExercise}
                    removeExercise={removeExercise}
                />
            ))}
            <button 
                className="btn btn-primary btn-sm" 
                onClick={addExercise}
            >Agregar Ejercicio
            </button>
        </div>
    );
};
