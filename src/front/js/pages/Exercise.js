import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Exercise = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    useEffect(() => {
        actions.getOneExercise(params.id)
        const muscle = actions.getMuscleGroup()
        console.log(muscle)
    }, [])
    // console.log(store.vehicle)

    return (
        <div className="container">
            <h1 style={{ color: "red" }}>Vehicle:</h1>
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={`https://starwars-visualguide.com/assets/img/vehicles/${params.id}.jpg`} className="card-img-top" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            {/* <h5 className="card-title">{store.exercise.Name}</h5> */}
                            <p className="card-text"><strong> model: </strong> {store.exercise.Name}</p>
                            <p className="card-text"><strong> vehicle_class: </strong> {store.exercise.Link_video}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};
