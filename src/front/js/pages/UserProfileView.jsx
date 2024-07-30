import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { BodyMeasurement } from '../component/BodyMeasurement.jsx';

export const UserProfileView = (index) => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        actions.getMemberById(id);
    }, [id]);


    //TRAER USER DATA 
    return (
        <div className="card col-11">
            <div className="d-flex justify-content-between align-items-center">
                <h1
                className="mb-3" 
                style={{ cursor: 'pointer' }}
                data-bs-toggle="collapse" 
                data-bs-target="#collapseExample" 
                aria-expanded="false" 
                aria-controls="collapseExample"
                >
                    MEMBE'S PROFILE <i className="bi bi-chevron-down"></i>
                </h1>
                <span 
                    className="d-flex justify-content-end" 
                    onClick={() => navigate(`/userData/${id}`)}
                    >
                        <i className="fa-solid fa-pen text-warning"></i></span>
            </div>
            <div className="collapse" id="collapseExample">
                <h2>Hello {store.member?.name}! </h2>
                <ul className="list-group list-group-flush">
                    <li key={index} className="list-group-item">
                        <strong>Name:</strong> {store.member.name}<br />
                        <strong>Lastname:</strong> {store.member.lastname}<br />
                        <strong>Gender:</strong> {store.member.gender}<br />
                        <strong>Height:</strong> {store.member.height} cm<br />
                        <strong>Weight:</strong> {store.member.weight} kg<br />
                        <strong>Birthday:</strong> {store.member.birthday}<br />
                        <strong>City:</strong> {store.member.city}<br />
                        <strong>Country:</strong> {store.member.country}<br />
                    </li>
                </ul>
            </div>

            <div className="mt-4">
                <h2
                    className="mb-3"
                    style={{ cursor: 'pointer' }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseMeasurements"
                    aria-expanded="false"
                    aria-controls="collapseMeasurements"
                >
                    BODY MEASUREMENTS <i className="bi bi-chevron-down"></i>
                </h2>
                <div className="collapse" id="collapseMeasurements">
                    {store.measurements.length > 0 ? (
                        store.measurements.map((measurement, index) => (
                            <BodyMeasurement
                                key={measurement.id}
                                measurement={measurement}
                                index={index}
                            />
                        ))
                    ) : (
                        <div className="alert alert-info" role="alert">
                            No measurements available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};



// <div className="card" style={{ width: "18rem" }}>
// <ul className="list-group list-group-flush">
//     {store.measurements.map((measure, index) => (
//         <li key={index} className="list-group-item">
//             <strong>Altura:</strong> {measure.height} cm<br />
//             <strong>Peso:</strong> {measure.weight} kg<br />
//             <strong>Cuello:</strong> {measure.neck} cm<br />
//             <strong>Brazo Relajado:</strong> {measure.relaxed_arm} cm<br />
//             <strong>Brazo Flexionado:</strong> {measure.flexed_arm} cm<br />
//             <strong>Cintura:</strong> {measure.waist} cm<br />
//             <strong>Pantorrillas:</strong> {measure.calves} cm<br />
//             <strong>Pecho:</strong> {measure.chest} cm<br />
//             <strong>Caderas:</strong> {measure.hips} cm<br />
//             <strong>Muslos:</strong> {measure.thighs} cm<br />
//             <strong>Hombros:</strong> {measure.shoulders} cm<br />
//         </li>
//     ))}
// </ul>
// </div>