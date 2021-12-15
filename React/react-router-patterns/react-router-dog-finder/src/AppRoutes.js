import { Route, Routes, Navigate } from "react-router-dom";
import DogDetails from "./DogDetails";
import DogList from "./DogList";

const AppRoutes = ({dogs}) => {
    return (
        <>
        <Routes>
            <Route path="/dogs" element={<DogList dogs={dogs} />} />
            <Route path="/dogs/:name" element={<DogDetails dogs={dogs} />} />
            <Route path="/" element={<Navigate replace to="/dogs" />} />
        </Routes>
        {/* <Navigate to="/dogs" /> */}
        </>
    )
}

export default AppRoutes;