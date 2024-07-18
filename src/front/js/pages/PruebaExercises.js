import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"


export const PruebaExercises = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        // console.log("Entre a useeffect")
        actions.getExercises()
    }, [])
    // actions.getExercises()
    console.log(store.valExercises)
    return (
        <div >
            <h1 style={{ color: "red" }}>Character:</h1>
            <div className="row row-cols-1 row-cols-md-4 mb-3 text-center">
                {store.valExercises.map((item, index) => {
                    return (
                        <div className="card p-4 m-3" key={index}>
                            <div className="card" >
                                <div className="card-body md-col3">
                                    <h5 className="card-title" onClick={() => { window.open(`${item.Link_video}`) }}>{item.Name} </h5>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-light btn-outline-danger btn-bg-white"  ><i className="fa-solid fa-video border-0" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
};
