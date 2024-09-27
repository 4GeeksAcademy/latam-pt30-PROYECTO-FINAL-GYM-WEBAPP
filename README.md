# GymApp Routine and Improvements Tracker with React JS and Flask API

## Overview
Developed a gym app enabling users to create and manage personalized workout routines, featuring sets check and rest-time chronometer, and graphical analytics for tracking body measurements and fitness goals, using React.js, Python, Flask, SQLAlchemy, Flux

- Engineered a responsive UI with React.js, achieving sub-1s loading times.
- Implemented Flask backend, ensuring API response times under 200ms.
- Utilized SQLAlchemy for efficient database management, supporting high traffic bandwidth.
- Integrated Flux architecture, enhancing state management and reducing latency.

## Target Audience
The app is aimed at users who want to follow customized workout routines and keep detailed records of their progress, both in terms of exercises and physical measurements.

## Technologies Used
- **Frontend**: [React](https://reactjs.org/)
- **Backend**: [Flask](https://flask.palletsprojects.com/), [Node.js](https://nodejs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Deployment**: Docker (optional), Heroku, or any hosting service compatible with PostgreSQL and Node.js
- **Version Control**: Git

## Key Features
- **Interactive Dashboard**: The main panel displays collapsible workout routines. Each routine contains:
  - **Training Days**: Each training day contains sets of exercises.
  - **Sets and Variants**:
    - **Set**: A single exercise.
    - **SuperSet**: Two exercises.
    - **TriSet**: Three exercises.
    - **GiantSet**: Four or more exercises.
- **User Profile**: Users can create a profile with their personal information and profile picture.
- **Body Measurement Tracking**: Members can record their physical measurements, collapse or expand the data by the registration date, and view charts showing their progress over time.
- **Custom Workouts**: Users can create new personalized routines, organized by days, with exercises grouped into sets, supersets, trisets, or giantsets.
- **Set Timer**: A custom timer that automatically adjusts to the needs of each set (supersets, trisets, etc.).

##App 

<img width="530" alt="Screenshot 2024-09-27 at 9 46 34 a m" src="https://github.com/user-attachments/assets/c3669267-35ed-4e22-b3de-44f53416b97f">
<img width="530" alt="Screenshot 2024-09-27 at 9 38 44 a m" src="https://github.com/user-attachments/assets/3e54d71e-2366-4ca8-b257-3f8c7bbfc241">

<img width="530" alt="Screenshot 2024-09-27 at 9 48 00 a m" src="https://github.com/user-attachments/assets/c1022ef1-bb08-4858-8d31-e17d55e7b809">
<img width="530" alt="Screenshot 2024-09-27 at 9 48 03 a m" src="https://github.com/user-attachments/assets/da1e8553-938c-42b7-a79e-f429ccf85a23">
<img width="530" alt="Screenshot 2024-09-27 at 9 48 22 a m" src="https://github.com/user-attachments/assets/cd5573c6-6793-4b03-85b0-435685103e5c">

<img width="530" alt="Screenshot 2024-09-27 at 9 49 41 a m" src="https://github.com/user-attachments/assets/b97bb7d5-4343-4837-bac2-ca51716e9db7">
<img width="530" alt="Screenshot 2024-09-27 at 9 47 35 a m" src="https://github.com/user-attachments/assets/89fcdeba-2332-4c6b-8714-7e9647c42f58">
<img width="530" alt="Screenshot 2024-09-27 at 9 47 50 a m" src="https://github.com/user-attachments/assets/64f8cc17-5cbf-4927-8c83-777ec72f64f0">

## Entity Structure

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



Workouts: Represents the overall workout routine. Each Workout has its own id.
DayForm: A Workout can have several days (represented by DayForm). Each DayForm has an id and a workout_id to identify which routine it belongs to.
Set: Each DayForm can contain several sets, identified by set_id. Sets can be of type Set, SuperSet, TriSet, or GiantSet.
Exercise: Each Set contains multiple exercises, each identified by an exercise_id.






