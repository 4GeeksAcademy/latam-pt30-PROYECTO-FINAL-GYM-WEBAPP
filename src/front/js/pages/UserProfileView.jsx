import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { BodyMeasurement } from '../component/BodyMeasurement.jsx';

export const UserProfileView = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    // const [image, setImage] = useState({
    //     image: ""
    // });

    useEffect(() => {
        actions.getMemberById(id);
        actions.getMeasurementsByMemberId(id);
    }, [id]);

    const image = store.memberProfileImage;

    //TRAER USER DATA 
    return (
        <div>
            <div className="card border-primary-subtle col-11 mx-auto p-3 my-3">
                <div className="d-flex justify-content-between align-items-center">
                    {image && (
                        <img 
                            className="d-block mb-2 rounded-circle" 
                            width={80}
                            src={image} 
                            alt="ProfileImage"
                        />
                    )}
                    <h1
                    className="mb-3" 
                    style={{ cursor: 'pointer' }}
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseProfile" 
                    aria-expanded="false" 
                    aria-controls="collapseProfile"
                    >
                        {`${store.member?.name?.toUpperCase() || ''}'S PROFILE`} <i className="fa-solid fa-caret-up m-2"></i>
                    </h1>
                    <span 
                        className="d-flex justify-content-end mx-1" 
                        onClick={() => navigate(`/editUser/${id}`)}
                        >
                            <i className="fa-solid fa-pen text-warning fs-2"></i></span>
                </div>
                <div className="collapse" id="collapseProfile">
                    <h2>{`Hello ${store.members?.name}!`}</h2>
                    <ul className="list-group list-group-flush">
                        <li key={id} className="list-group-item">
                            <strong>Name:</strong> {store.members.name}<br />
                            <strong>Lastname:</strong> {store.members.lastname}<br />
                            <strong>Gender:</strong> {store.members.gender}<br />
                            <strong>Height:</strong> {store.members.height} cm<br />
                            <strong>Weight:</strong> {store.members.weight} kg<br />
                            <strong>Birthday:</strong> {store.members.birthday}<br />
                            <strong>City:</strong> {store.members.city}<br />
                            <strong>Country:</strong> {store.members.country}<br />
                        </li>
                    </ul>
                </div>
            </div>

            <div className=" d-flex justify-content-between  mt-4 card border-warning-subtle col-11 mx-auto p-2">
                <h3
                    className="mb-3"
                    style={{ cursor: 'pointer' }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseMeasurements"
                    aria-expanded="false"
                    aria-controls="collapseMeasurements"
                >
                    BODY MEASUREMENTS <i className="fa-solid fa-caret-up m-2"></i>
                </h3>
                <span
                    className="d-flex justify-content-end "
                    onClick={() => navigate(`/createMeasurement`)}
                >
                    <i className="fa-solid fa-circle-plus fs-1 text-success p-2"></i>
                </span>
                {store.body_measurements && store.body_measurements.length > 0 ? (
                    <ul className='list-group'>
                        {store.body_measurements.map((measurement, index) => (
                            <li key={measurement.id} className='list-group-item'>
                                <BodyMeasurement
                                    key={measurement.id}
                                    measurement={measurement}
                                    index={index}
                                    //className=""
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="alert alert-info" role="alert">
                        No measurements available.
                    </div>
                )}
            </div>
            <div className=" d-flex justify-content-between  mt-4 card border-danger-subtle col-11 mx-auto p-2">
                <h3
                    className="mb-3"
                    style={{ cursor: 'pointer' }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseGraphics"
                    aria-expanded="false"
                    aria-controls="collapseGraphics"
                >
                    GRAPHICS <i className="fa-solid fa-caret-up m-2"></i>
                </h3>
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