import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const BodyMeasurementForm = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        height: '',
        weight: '',
        neck: '',
        relaxed_arm: '',
        flexed_arm: '',
        waist: '',
        calves: '',
        chest: '',
        hips: '',
        thighs: '',
        shoulders: '',
        date: ''
    });

    useEffect(() => {
        if (id) {
            const measurement = store.body_measurements.find(measurement => measurement.id.toString() === id);
            if (measurement) {
                setInput(measurement);
            }
        }
    }, [id, store.body_measurements]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const action = id ? actions.updateBodyMeasurement : actions.createBodyMeasurement;
        const success = await action(input);
        if (success) {
            navigate(`/profileView/${id}`);
        }
    };

    const icons = {
        height: './icons/height.png',
        //height: '/icons/height.png',
        weight: '/icons/weight.png',
        //weight: '/icons/weight.png',
        neck: '/icons/neck.png',
        //neck: '/icons/neck.png',
        relaxed_arm: '/icons/relaxed_arm.png',
        //relaxed_arm: '/icons/relaxed_arm.png',
        flexed_arm: '/icons/flexed_arm.png',
        //flexed_arm: '/icons/flexed_arm.png',
        waist: '/icons/waist.png',
        //waist: '/icons/waist.png',
        calves: '/icons/calves.png',
        //calves: '/icons/calves.png',
        chest: '/icons/chest.png',
        //chest: '/icons/chest.png',
        hips: '/icons/hips.png',
        //hips: '/icons/hips.png',
        thighs: '/icons/thighs.png',
        //thighs: 'https://www.flaticon.com/free-icon/calendar_2886665?term=date&page=1&position=1&origin=search&related_id=2886665',
        shoulders: '/icons/shoulders.png',
        //shoulders: 'https://www.flaticon.com/free-icon/calendar_2886665?term=date&page=1&position=1&origin=search&related_id=2886665',
        //date: 'https://www.flaticon.com/free-icon/calendar_2886665?term=date&page=1&position=1&origin=search&related_id=2886665'
    };

    return (
        <div className="card col-11 m-auto m-4 mb-5 pb-5">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <form onSubmit={handleSubmit}>
                        <div className='d-flex justify-content-between'>
                            <span
                                className="m-3"
                                onClick={() => navigate(`/profileView/${id}`)}
                            >
                                <i className="fa-solid fa-circle-chevron-left fs-1"></i>
                            </span>
                            <h1 className='p-5'>ADD BODY MEASUREMENTS</h1>
                        </div>
                        {Object?.keys(input).map((key) => (
                            <div className="mb-3" key={key}>
                                <label htmlFor={key} className="form-label">
                                    <img 
                                        src={icons[key]} 
                                        alt={`${key} icon`} 
                                        className="me-2" 
                                        style={{ width: '24px', height: '24px' }} 
                                    />
                                    {key.replace('_', ' ').toUpperCase()}
                                </label>
                                <input
                                    type={key === 'date' ? 'date' : 'number'}
                                    className="form-control border-success"
                                    id={key}
                                    name={key}
                                    placeholder={key.replace('_', ' ').toUpperCase()}
                                    aria-describedby={`${key}Help`}
                                    onChange={handleInputChange}
                                    value={input[key]}
                                    required
                                />
                                <div id={`${key}Help`} className="form-text">
                                    {key === 'date' ? 'Date of measurement.' : `Your ${key.replace('_', ' ')} in cm/kg.`}
                                </div>
                            </div>
                        ))}

                        <button type="submit" className="btn btn-primary mb-5">
                            {id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    );
};
