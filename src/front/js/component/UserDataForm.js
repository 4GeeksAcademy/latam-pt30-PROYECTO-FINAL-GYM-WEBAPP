import React from 'react'
import { Form } from '../../hooks/Form.jsx'

const UserDataForm = () => {
    const initialForm = {
        name: '',
        lastname: '',
        gender: '',
        height: '',
        weight: '',
        birthday: '',
        city: '',
        country: '',
    }
    const [input, handleInputChange, clearForm] = Form(initialForm)
    return (
        <form>
            <div>
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    value={input.name}
                    required
                    maxLength={32}
                />
            </div>
            <div>
                <label htmlFor="lastname">Apellido</label>
                <input
                    type="text"
                    name="lastname"
                    onChange={handleInputChange}
                    value={input.lastname}
                    required
                    maxLength={32}
                />
            </div>
            <div>
                <label htmlFor="gender">Masculino</label>
                <input
                    type="radio"
                    name="gender"
                    onChange={handleInputChange}
                    value="Masculino"
                    id="masculino"
                    checked={input.gender === "Masculino"}
                />
            </div>
            <div>
                <label htmlFor="gender">Femenino</label>
                <input
                    type="radio"
                    name="gender"
                    onChange={handleInputChange}
                    value="Femenino"
                    id="femenino"
                    checked={input.gender === "Femenino"}
                />
            </div>
            <div>
                <label htmlFor="gender">Otro</label>
                <input
                    type="radio"
                    name="gender"
                    onChange={handleInputChange}
                    value="Otro"
                    id="otro"
                    checked={input.gender === "Otro"}
                />
            </div>
            <div>
                <label htmlFor="height">Altura</label>
                <input
                    type="text"
                    name="height"
                    onChange={handleInputChange}
                    value={input.height}
                    required
                />
            </div>
            <div>
                <label htmlFor="weight">Peso</label>
                <input
                    type="text"
                    name="weight"
                    onChange={handleInputChange}
                    value={input.weight}
                    required
                />
            </div>
            <div>
                <label htmlFor="birthday">Fecha de nacimiento</label>
                <input
                    type="date"
                    name="birthday"
                    onChange={handleInputChange}
                    value={input.birthday}
                    required
                />
            </div>
            <div>
                <label htmlFor="city">Ciudad</label>
                <input
                    type="text"
                    name="city"
                    onChange={handleInputChange}
                    value={input.city}
                    required
                />
            </div>
            <div>
                <label htmlFor="country">país</label>
                <input
                    type="text"
                    name="country"
                    onChange={handleInputChange}
                    value={input.country}
                    required
                />
            </div>
            <button
                type="submit"
                className=""
            >
                Actualizar Datos
            </button>
        </form>
    )
}

export default UserDataForm
