import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { SignUp } from "./pages/SignUp.js";
import { LogIn } from "./pages/LogIn.js";
import { Dashboard } from "./pages/Dashboard.js";
import { Workout } from "./pages/Workout.js"; // Nueva importación por Kevin
import injectContext from "./store/appContext";
import { PruebaExercises } from "./pages/PruebaExercises"; // Nueva importación por GE
import { Exercise } from "./pages/Exercise"; // Nueva importación por GE
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { CreatePlan } from "./pages/CreatePlan.jsx";
import { MyWorkOut } from "./component/MyWorkOut.jsx";
import { UserDataForm } from "./component/UserDataForm.jsx";
import { UserProfileView } from "./pages/UserProfileView.jsx";
import { BodyMeasurementForm } from "./component/BodyMeasurementForm.jsx";
import { MemberSignup } from "./component/MemberSignup.jsx";
import EditPlan from "./pages/EditPlan.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<SignUp />} path="/" />
            <Route element={<LogIn />} path="/login" />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<EditPlan />} path="/edit-plan/:id" />
            <Route element={<CreatePlan />} path="/create-plan" />
            <Route element={<Workout />} path="/workout/:workoutId/day/:dayId/exercise/:name" />
            <Route element={<MyWorkOut/>} path="/MyWorkOut"/>
            <Route element={<h1>Not found!</h1>} path="*"/>


            <Route element={<BodyMeasurementForm/>} path="/createMeasurement"/>
            <Route element={<BodyMeasurementForm/>} path="/editMeasurement/:id"/>
            <Route element={<UserDataForm/>} path="/editUser/:id"/>
            <Route element={<UserDataForm/>} path="/createUser"/>
            <Route element={<UserProfileView/>} path="/profileView/:id"/>
            <Route element={<UserProfileView/>} path="/profileView"/>

            <Route element={<MemberSignup />} path="/memberSignup" />
            {/* <Route element={<Workout />} path="/workout/:exerciseName" />
            <Route element={<Exercise />} path="/exercises/:id" />
            <Route element={<PruebaExercises />} path="/exercises" />
            <Route element={<Exercise />} path="/prueba/:id" /> */}
            <Route element={<PruebaExercises />} path="/prueba" />

          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
