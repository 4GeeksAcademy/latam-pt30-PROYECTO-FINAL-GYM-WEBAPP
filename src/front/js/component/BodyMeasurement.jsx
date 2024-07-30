import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const BodyMeasurement = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        actions.getMeasurementsByMemberId(id);
    }, [id]);

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
                    BODY MEASUREMENTS <i className="bi bi-chevron-down"></i>
                </h1>
                <span
                    className="d-flex justify-content-end"
                    onClick={() => navigate(`/editMeasurement/${id}`)}
                >
                    <i className="fa-solid fa-pen text-warning"></i>
                </span>
                <span
                        className="d-flex justify-content-end"
                        onClick={() => navigate(`/createMeasurement`)}
                    >
                        <i className="fa-solid fa-circle-plus text-success"></i>
                </span>
            </div>
            <div className="collapse" id="collapseExample">
                <ul className="list-group list-group-flush">
                    {store.body_measurements.length > 0 ? (
                        store.body_measurements.map((measurement, index) => (
                            <li key={index} className="list-group-item">
                                <strong>Date:</strong> {measurement.date}<br />
                                <strong>Height:</strong> {measurement.height} cm<br />
                                <strong>Weight:</strong> {measurement.weight} kg<br />
                                <strong>Neck:</strong> {measurement.neck} cm<br />
                                <strong>Relaxed Arm:</strong> {measurement.relaxed_arm} cm<br />
                                <strong>Flexed Arm:</strong> {measurement.flexed_arm} cm<br />
                                <strong>Waist:</strong> {measurement.waist} cm<br />
                                <strong>Calves:</strong> {measurement.calves} cm<br />
                                <strong>Chest:</strong> {measurement.chest} cm<br />
                                <strong>Hips:</strong> {measurement.hips} cm<br />
                                <strong>Thighs:</strong> {measurement.thighs} cm<br />
                                <strong>Shoulders:</strong> {measurement.shoulders} cm<br />
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item">No measurements available.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};
