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
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4
                    className="mb-3 p-3"
                    //style={{ cursor: 'pointer' }}
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseMeasurement${id}`}
                    //aria-expanded="false"
                    aria-controls={`collapseMeasurement${id}`}
                >
                    {store.body_measurements?.date} MEASUREMENT <i className="fa-solid fa-caret-up m-3"></i>
                </h4>
                <span
                    className="d-flex justify-content-end m-2"
                    onClick={() => navigate(`/editMeasurement/${id}`)}
                >
                    <i className="fa-solid fa-pen text-warning"></i>
                </span>
                {/* <span
                        className="d-flex justify-content-end"
                        onClick={() => navigate(`/createMeasurement`)}
                    >
                        <i className="fa-solid fa-circle-plus text-success"></i>
                </span> */}
            </div>
            <div className="collapse m-auto" id={`collapseMeasurement${id}`}>
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
        </>
    );
};
