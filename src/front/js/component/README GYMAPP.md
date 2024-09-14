# GymApp Routine Tracker

## Descripción General
La aplicación **Gym Routine Tracker** está diseñada para personas que siguen rutinas personalizadas de levantamiento de pesas, ya sea escritas por sus entrenadores o por ellos mismos. Proporciona un cronómetro personalizado para cada serie de ejercicios y permite hacer un seguimiento visual de las rutinas y del progreso físico a través de medidas corporales.

## Público objetivo
La aplicación está destinada a usuarios que desean seguir rutinas de entrenamiento personalizadas y llevar un control detallado de sus avances, tanto en términos de ejercicios como de medidas físicas.

## Tecnologías Utilizadas
- **Frontend**: [React](https://reactjs.org/)
- **Backend**: [Flask](https://flask.palletsprojects.com/), [Node.js](https://nodejs.org/)
- **Base de datos**: [PostgreSQL](https://www.postgresql.org/)
- **Despliegue**: Docker (opcional), Heroku o cualquier servicio de hosting compatible con PostgreSQL y Node.js
- **Versionado de control**: Git

## Funcionalidades Principales
- **Dashboard interactivo**: El panel principal despliega las rutinas de ejercicios de forma colapsable. Cada rutina contiene:
  - **Días de entrenamiento**: Cada día de entrenamiento contiene conjuntos de ejercicios (Sets).
  - **Sets y variantes**:
    - **Set**: Un solo ejercicio.
    - **SuperSet**: Dos ejercicios.
    - **TriSet**: Tres ejercicios.
    - **GiantSet**: Cuatro o más ejercicios.
- **Perfil de usuario**: Los usuarios pueden crear un perfil con su información personal e imagen de perfil.
- **Seguimiento de medidas corporales**: Los miembros pueden registrar sus medidas físicas, colapsar o expandir los datos según la fecha de registro y visualizar gráficos que muestran su progreso a lo largo del tiempo.
- **Rutinas personalizadas**: Los usuarios pueden crear nuevas rutinas personalizadas, organizadas por días, con ejercicios agrupados en sets, supersets, trisets o giantsets.
- **Cronómetro entre series**: Cronómetro personalizado que se ajusta automáticamente a las necesidades de cada set (biseries, triseries, etc.).



## Instalación y Configuración
Clonar el repositorio:


git clone https://github.com/tuusuario/gym-routine-tracker.git
cd gym-routine-tracker


## Instalar las dependencias:

# Backend
pip install -r requirements.txt

# Frontend
npm install

## Configurar el entorno:

- ** Crear un archivo .env con las siguientes variables:

DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/gym_tracker_db
SECRET_KEY=tu_clave_secreta
FLASK_ENV=development

## Inicializar la base de datos:

flask db init
flask db migrate
flask db upgrade
Iniciar la aplicación:


# Backend
flask run

# Frontend
npm start

## Instrucciones de Uso
##Registro y autenticación:

- ** La aplicación cuenta con un sistema de registro y autenticación que diferencia entre usuarios regulares y miembros con acceso a funcionalidades avanzadas.
- ** El menú inferior contiene accesos directos al perfil, rutinas y creación de nuevas rutinas.

## Dashboard de Rutinas:

- ** En el panel de control, los usuarios pueden expandir/collapsear los días de entrenamiento y dentro de cada día, visualizar los sets de ejercicios.
- ** Los sets pueden contener entre 1 y 4 ejercicios, clasificados como Set, SuperSet, TriSet o GiantSet.

## Cronómetro Personalizado:

- ** El cronómetro comienza automáticamente cuando se completa un set, ajustando el tiempo según el tipo de set (ej. más tiempo de descanso para GiantSets).

Seguimiento de Medidas Corporales:

- ** Los miembros pueden registrar y visualizar gráficamente el progreso de sus medidas corporales, que se agrupan por fecha de registro y se despliegan colapsables.

## Contribuciones
- ** Realiza un fork del proyecto.
- ** Crea una rama con tus cambios:

git checkout -b feature/nueva-funcionalidad

- ** Realiza commits descriptivos.
- ** Abre un Pull Request para revisión.

## Pruebas
- ** Para ejecutar pruebas unitarias, utiliza el siguiente comando:

npm test

- ** Asegúrate de agregar pruebas para cualquier nueva funcionalidad que implementes.

## Licencia
- ** Este proyecto está licenciado bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.

## Contacto
- ** Para cualquier pregunta o sugerencia, por favor contacta a thesocialdys@gmail.com

## Estructura de Entidades

```plaintext
Workouts (id)
   |
   +-- DayForm (id, workout_id)
   |       |
   |       +-- Set (set_id, dayform_id, set_type)
   |              |
   |              +-- Exercise (exercise_id, set_id)
   |
   +-- DayForm (id, workout_id)
           |
           +-- Set (set_id, dayform_id, set_type)
                  |
                  +-- Exercise (exercise_id, set_id)

- ** Workouts: Representa la rutina general. Cada Workout tiene su propio id.
- ** DayForm: Un Workout puede tener varios días (representados por DayForm). Cada DayForm tiene un id y un workout_id para saber a qué rutina pertenece.
- ** Set: Cada DayForm puede contener varios sets, identificados por set_id. Los sets pueden ser de tipo Set, SuperSet, TriSet o GiantSet.
- ** Exercise: Cada Set contiene múltiples ejercicios, cada uno identificado por un exercise_id.

