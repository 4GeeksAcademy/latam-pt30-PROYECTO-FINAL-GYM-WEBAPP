import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';


export const UserDataForm = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    const initialValues = {
        name: '',
        lastname: '',
        gender: '',
        height: '',
        weight: '',
        birthday: '',
        city: '',
        country: '',
        image: ""
    }
    const [ values, setValues ] = useState(initialValues);

    useEffect(() => {
        if (id) {
            const member = store.members.find(member => member.id.toString() === id);
            if (member) 
                setValues(member);
        }
    }, [id, store.members]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleImageChange = async (e) => {
        console.log(values.image);
        console.log(e.target.files[0]);
        
        const response = await actions.imageUpload(e.target.files[0]);
        // console.log(response);
        
        if (response) {
            setValues({ ...values, image: response.secure_url });
            store.memberProfileImage(response)
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const sucess = actions.updateUser() ;
        //const success = await action(input);
        if (sucess) {
            navigate(`/profileView/${id}`); // Replace with the path where you want to navigate after successful submit
        }
    };

    const genderOptions = ["Male", "Female", "Other"]; 

    return (
        <div className="card col-11 m-4 mb-5">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <form onSubmit={handleSubmit}>
                            <span
                                className="m-3"
                                onClick={() => navigate(`/profileView/${id}`)}
                            >
                                <i className="fa-solid fa-circle-chevron-left fs-1"></i>
                            </span>
                        <h1>PROFILE INFO</h1>
                        <label htmlFor="uploadImage" className="form-label mt-3">Profile Picture</label>
                        {values.image && (
                            <img 
                                src={values.image} 
                                alt="ProfileImage"
                                className="d-block mb-2 rounded-circle" 
                                width={80}
                            />
                        )}
                        <input 
                            type="file" 
                            className="filepond mb-3 border-warning-subtle"
                            id="uploadImage"
                            name="image"
                            value={values.image}
                            onChange={handleImageChange}
                            accept="image/png, image/jpeg, image/gif"
                        />
                        {[
                            { label: 'Name', name: 'name', type: 'text', placeholder: 'Name' },
                            { label: 'Lastname', name: 'lastname', type: 'text', placeholder: 'Lastname', helpText: 'Your last name is important for differentiation.', maxLength: 32 },
                            { label: 'Height', name: 'height', type: 'text', placeholder: 'Height', helpText: 'Your height in centimeters.' },
                            { label: 'Weight', name: 'weight', type: 'text', placeholder: 'Weight', helpText: 'Your weight in kilograms.' },
                            { label: 'Birthday', name: 'birthday', type: 'date', helpText: 'Your birthdate.' },
                            { label: 'City', name: 'city', type: 'text', placeholder: 'City', helpText: 'Your city of residence.' },
                            { label: 'Country', name: 'country', type: 'text', placeholder: 'Country', helpText: 'Your country of residence.' }
                        ].map((field, index) => (
                            <div className="mb-3" key={index}>
                                <label htmlFor={field.name} className="form-label">{field.label}</label>
                                <input
                                    type={field.type}
                                    className="form-control border-success"
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    aria-describedby={field.name + 'Help'}
                                    onChange={handleInputChange}
                                    value={values.name}
                                    required
                                    maxLength={field.maxLength}
                                />
                                {field.helpText && <div id={field.name + 'Help'} className="form-text">{field.helpText}</div>}
                            </div>
                        ))}

                        <div className="mb-3">
                            <label className="form-label">Gender</label>
                            {genderOptions.map((option, index) => (
                                <div className="form-check border-success" key={index}>
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id={option.toLowerCase()}
                                        name="gender"
                                        aria-describedby="genderHelp"
                                        value={option}
                                        onChange={handleInputChange}
                                        //checked={input.gender === option}
                                    />
                                    <label className="form-check-label" htmlFor={option.toLowerCase()}>{option}</label>
                                </div>
                            ))}
                            <div id="genderHelp" className="form-text">Please select other if you do not identify with the enlisted or prefer not to answer.</div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            {id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    );
};


//     return (
//         <div className="card col-11">
//             <ul className="list-group list-group-flush">
//                 <li className="list-group-item">
//                     <form onSubmit={handleSubmit}>
//                         <h1>PROFILE DATA INPUT</h1>
//                         <div className="mb-3">
//                             <label htmlFor="name" className="form-label">Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="name"
//                                 name="name"
//                                 placeholder='Name'
//                                 aria-describedby="nameHelp"
//                                 onChange={handleInputChange}
//                                 value={input.name}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="lastname" className="form-label">Lastname</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="lastname"
//                                 name="lastname"
//                                 placeholder="Lastname"
//                                 aria-describedby="lastnameHelp"
//                                 onChange={handleInputChange}
//                                 value={input.lastname}
//                                 required
//                                 maxLength={32}
//                             />
//                             <div id="lastnameHelp" className="form-text">Your last name is important for differentiation.</div>
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label">Gender</label>
//                             <div className="form-check">
//                                 <input
//                                     type="radio"
//                                     className="form-check-input"
//                                     id="male"
//                                     name="gender"
//                                     aria-describedby="genderHelp"
//                                     value="Male"
//                                     onChange={handleInputChange}
//                                     checked={input.gender === "Male"}
//                                 />
//                                 <label className="form-check-label" htmlFor="male">Male</label>
//                             </div>
//                             <div className="form-check">
//                                 <input
//                                     type="radio"
//                                     className="form-check-input"
//                                     id="female"
//                                     name="gender"
//                                     aria-describedby="femaleHelp"
//                                     value="Female"
//                                     onChange={handleInputChange}
//                                     checked={input.gender === "Female"}
//                                 />
//                                 <label className="form-check-label" htmlFor="female">Female</label>
//                             </div>
//                             <div className="form-check">
//                                 <input
//                                     type="radio"
//                                     className="form-check-input"
//                                     id="other"
//                                     name="gender"
//                                     aria-describedby="otherHelp"
//                                     value="Other"
//                                     onChange={handleInputChange}
//                                     checked={input.gender === "Other"}
//                                 />
//                                 <label className="form-check-label" htmlFor="other">Other</label>
//                             </div>
//                             <div id="genderHelp" className="form-text">Please select other if you do not identify with the enlisted or prefer not to answer.</div>
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="height" className="form-label">Height</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="height"
//                                 name="height"
//                                 placeholder="Height"
//                                 aria-describedby="heightHelp"
//                                 onChange={handleInputChange}
//                                 value={input.height}
//                                 required
//                             />
//                             <div id="heightHelp" className="form-text">Your height in centimeters.</div>
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="weight" className="form-label">Weight</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="weight"
//                                 name="weight"
//                                 placeholder="Weight"
//                                 aria-describedby="weightHelp"
//                                 onChange={handleInputChange}
//                                 value={input.weight}
//                                 required
//                             />
//                             <div id="weightHelp" className="form-text">Your weight in kilograms.</div>
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="birthday" className="form-label">Birthday</label>
//                             <input
//                                 type="date"
//                                 className="form-control"
//                                 id="birthday"
//                                 name="birthday"
//                                 aria-describedby="birthdayHelp"
//                                 onChange={handleInputChange}
//                                 value={input.birthday}
//                                 required
//                             />
//                             <div id="birthdayHelp" className="form-text">Your birthdate.</div>
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="city" className="form-label">City</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="city"
//                                 name="city"
//                                 placeholder="City"
//                                 aria-describedby="cityHelp"
//                                 onChange={handleInputChange}
//                                 value={input.city}
//                                 required
//                             />
//                             <div id="cityHelp" className="form-text">Your city of residence.</div>
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="country" className="form-label">Country</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="country"
//                                 name="country"
//                                 placeholder="Country"
//                                 aria-describedby="countryHelp"
//                                 onChange={handleInputChange}
//                                 value={input.country}
//                                 required
//                             />
//                             <div id="countryHelp" className="form-text">Your country of residence.</div>
//                         </div>

//                         <button type="submit" className="btn btn-primary">
//                             {id ? 'Update' : 'Submit'}
//                         </button>
//                     </form>
//                 </li>
//             </ul>
//         </div>
//     );
// };



// const UserDataForm = () => {
// const initialForm = {
//     id: '',
//     name: '',
//     lastname: '',
//     gender: '',
//     height: '',
//     weight: '',
//     birthday: '',
//     city: '',
//     country: '',
// }
// const [input, handleInputChange, clearForm] = Form(initialForm)
// return (
//     <form>
//         <h1>PROFILE DATA</h1>
//         <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
//             <input 
//             type="name" 
//             className="form-control" 
//             id="exampleInputEmail1" 
//             placeholder='Name'
//             aria-describedby="nameHelp"/>
//             <div id="nameHelp" className="form-text">We'll never share your name with anyone else.</div>
//         </div>

//         <div className="mb-3">
//             <label htmlFor="lastname" className="form-label">Lastname</label>
//             <input
//                 type="text"
//                 className="form-control"
//                 id="lastname"
//                 name="lastname"
//                 placeholder="Lastname"
//                 aria-describedby="lastnameHelp"
//                 onChange={handleInputChange}
//                 value={input.lastname}
//                 required
//                 maxLength={32}
//             />
//             <div id="lastnameHelp" className="form-text">Your last name is important for identification.</div>
//         </div>
        
//         <div className="mb-3">
//             <label className="form-label">Gender</label>
//             <div className="form-check">
//                 <input
//                     type="radio"
//                     className="form-check-input"
//                     id="male"
//                     name="gender"
//                     value="Male"
//                     onChange={handleInputChange}
//                     checked={input.gender === "Male"}
//                 />
//                 <label className="form-check-label" htmlFor="male">Male</label>
//             </div>
//             <div className="form-check">
//                 <input
//                     type="radio"
//                     className="form-check-input"
//                     id="female"
//                     name="gender"
//                     value="Female"
//                     onChange={handleInputChange}
//                     checked={input.gender === "Female"}
//                 />
//                 <label className="form-check-label" htmlFor="female">Female</label>
//             </div>
//             <div className="form-check">
//                 <input
//                     type="radio"
//                     className="form-check-input"
//                     id="other"
//                     name="gender"
//                     value="Other"
//                     onChange={handleInputChange}
//                     checked={input.gender === "Other"}
//                 />
//                 <label className="form-check-label" htmlFor="other">Other</label>
//             </div>
//             <div id="lastnameHelp" className="form-text">Please select other if you do not identify with the enlisted or prefer not to answer.</div>
//         </div>

//         <div className="mb-3">
//             <label htmlFor="height" className="form-label">Height</label>
//             <input
//                 type="text"
//                 className="form-control"
//                 id="height"
//                 name="height"
//                 placeholder="Height"
//                 aria-describedby="heightHelp"
//                 onChange={handleInputChange}
//                 value={input.height}
//                 required
//             />
//             <div id="heightHelp" className="form-text">Your height in centimeters.</div>
//         </div>

//        <div className="mb-3">
//             <label htmlFor="weight" className="form-label">Weight</label>
//             <input
//                 type="text"
//                 className="form-control"
//                 id="weight"
//                 name="weight"
//                 placeholder="Weight"
//                 aria-describedby="weightHelp"
//                 onChange={handleInputChange}
//                 value={input.weight}
//                 required
//             />
//             <div id="weightHelp" className="form-text">Your weight in kilograms.</div>
//         </div>
//         <div className="mb-3">
//             <label htmlFor="birthday" className="form-label">Birthday</label>
//             <input
//                 type="date"
//                 className="form-control"
//                 id="birthday"
//                 name="birthday"
//                 aria-describedby="birthdayHelp"
//                 onChange={handleInputChange}
//                 value={input.birthday}
//                 required
//             />
//             <div id="birthdayHelp" className="form-text">Your birthdate.</div>
//         </div>
      
//         <div className="mb-3">
//             <label htmlFor="city" className="form-label">City</label>
//             <input
//                 type="text"
//                 className="form-control"
//                 id="city"
//                 name="city"
//                 placeholder="City"
//                 aria-describedby="cityHelp"
//                 onChange={handleInputChange}
//                 value={input.city}
//                 required
//             />
//             <div id="cityHelp" className="form-text">Your city of residence.</div>
//         </div>

//         <div className="mb-3">
//             <label htmlFor="country" className="form-label">Country</label>
//             <input
//                 type="text"
//                 className="form-control"
//                 id="country"
//                 name="country"
//                 placeholder="Country"
//                 aria-describedby="countryHelp"
//                 onChange={handleInputChange}
//                 value={input.country}
//                 required
//             />
//             <div id="countryHelp" className="form-text">Your country of residence.</div>
//         </div>

//         <button
//             type="submit"
//             className=""
//         >
//             Actualizar Datos
//         </button>
//     </form>
// )
// }
