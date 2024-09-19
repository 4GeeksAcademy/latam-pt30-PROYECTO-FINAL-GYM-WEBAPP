import React, { useState, useEffect } from "react";
import { ExerciseForm } from "./ExcerciseForm.jsx";

export const Sets = ({ set, updateSet, removeSet }) => {
    const [exercises, setExercises] = useState(set.exercises || []);
    const [alertMessage, setAlertMessage] = useState('');

    // Determinar el número máximo de ejercicios según el tipo de set
    // const maxExercises = (() => {
    //     switch (set.type) {
    //         case 'SuperSet': return 2;
    //         case 'TriSet': return 3;
    //         case 'GrandSet': return 8;
    //         default: return 1;
    //     }
    // })();

    // Función para determinar el tipo de set basado en la cantidad de ejercicios
    const determineSetType = (exerciseCount) => {
        if (exerciseCount >= 8) return 'GrandSet';
        if (exerciseCount === 3) return 'TriSet';
        if (exerciseCount === 2) return 'SuperSet';
        return 'Set';
    };


    // Controlar el número de ejercicios permitidos
    // const addExercise = () => {
    //     if (exercises.length < maxExercises) {
    //         setExercises([...exercises, { id: Date.now(), name: "", reps: 0, rounds: 0 }]);
    //     } else {
    //         alert(`Solo puedes agregar hasta ${maxExercises} ejercicios para un ${set.type}`);
    //     }
    // };

    // Función para mostrar una alerta cuando el tipo de set cambie
    const showAlert = (newSetType) => {
        setAlertMessage(`El set ha cambiado a ${newSetType}`);
        setTimeout(() => setAlertMessage(''), 3000); // Limpiar la alerta después de 3 segundos
    };

    // Agregar un ejercicio sin límite de cantidad, y cambiar el tipo de set dinámicamente
    const addExercise = () => {
        const updatedExercises = [...exercises, { id: Date.now(), name: "", reps: 0, rounds: 0 }];
        setExercises(updatedExercises);
        
        // Determinar el nuevo tipo de set basado en el número de ejercicios
        const newSetType = determineSetType(updatedExercises.length);
        if (newSetType !== set.type) {
            showAlert(newSetType);
        }
        updateSet({ ...set, exercises: updatedExercises, type: newSetType });
    };


    // Actualizar los ejercicios y el set al cambiar
    // const updateExercise = (id, updatedExercise) => {
    //     const updatedExercises = exercises.map(ex => ex.id === id ? updatedExercise : ex);
    //     setExercises(updatedExercises);
    //     updateSet({ ...set, exercises: updatedExercises });
    // };

    // Actualizar los ejercicios y cambiar el tipo de set si es necesario
    const updateExercise = (id, updatedExercise) => {
        const updatedExercises = exercises.map(ex => ex.id === id ? updatedExercise : ex);
        setExercises(updatedExercises);
        
        // Determinar el nuevo tipo de set basado en el número de ejercicios
        const newSetType = determineSetType(updatedExercises.length);
        if (newSetType !== set.type) {
            showAlert(newSetType);
        }
        updateSet({ ...set, exercises: updatedExercises, type: newSetType });
    };

    // const removeExercise = (id) => {
    //     const updatedExercises = exercises.filter(ex => ex.id !== id);
    //     setExercises(updatedExercises);
    //     updateSet({ ...set, exercises: updatedExercises });
    // };

    const removeExercise = (id) => {
        const updatedExercises = exercises.filter(ex => ex.id !== id);
        setExercises(updatedExercises);
        
        // Determinar el nuevo tipo de set basado en el número de ejercicios restantes
        const newSetType = determineSetType(updatedExercises.length);
        if (newSetType !== set.type) {
            showAlert(newSetType);
        }
        updateSet({ ...set, exercises: updatedExercises, type: newSetType });
    };

    // Efecto para actualizar el set cuando cambian los ejercicios
    // useEffect(() => {
    //     updateSet({ ...set, exercises });
    // }, [exercises]);

    useEffect(() => {
        const newSetType = determineSetType(exercises.length);
        if (newSetType !== set.type) {
            showAlert(newSetType);
        }
        updateSet({ ...set, exercises, type: newSetType });
    }, [exercises]);

    return (
        <div className="set-container mb-4">
            <h4>Set {set.id} - {set.type}</h4>
            <button 
                className="btn btn-outline-danger btn-sm mb-4 mt-2" 
                onClick={() => removeSet(set.id)}
            >Delete Set
            </button>
            
            {exercises.map((exercise, index) => (
                <ExerciseForm
                    key={exercise.id || index}
                    exercise={exercise}
                    updateExercise={updateExercise}
                    removeExercise={removeExercise}
                />
            ))}
            <button 
                className="btn btn-outline-success btn-sm" 
                onClick={addExercise}
            >Add Exercise
            </button>
        </div>
    );
};
