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
import { CreateEditPlan } from "./pages/CreateEditPlan.jsx";
import { MyWorkOut } from "./component/MyWorkOut.jsx";

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
            <Route element={<CreateEditPlan />} path="/creatEditPlan/:id" />
            <Route element={<Workout />} path="/workout/:workoutId/day/:dayId/exercise/:name" />
            <Route element={<h1>Not found!</h1>} path="*"/>

            <Route element={<MyWorkOut/>} path="/MyWorkOut"/>

            {/* <Route element={<Workout />} path="/workout/:exerciseName" />
            <Route element={<PruebaExercises />} path="/exercises" />
            <Route element={<Exercise />} path="/exercises/:id" />
            <Route element={<PruebaExercises />} path="/prueba" />
            <Route element={<Exercise />} path="/prueba/:id" /> */}

            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
