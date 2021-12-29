
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyList from "./CompanyList";
import NavBar from "./NavBar";
import Home from "./Home";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import useLocalStorage from "./hooks";
import jwt from "jsonwebtoken"
import Profile from "./Profile";
import UserContext from "./UserContext";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [applicationIds, setApplicationIds] = useState(new Set([]));
    const [loggedIn, setLoggedIn] = useState(false);
    const [currUser, setCurrUser] = useState(null);
    const [token, setToken] = useLocalStorage();

    useEffect(function loadUserInfo() {

        async function userInfo() {
            if (token) {
                try {
                    let { username } = jwt.decode(token);

                    let currUser = await JoblyApi.getUser(username);
                    setCurrUser(currUser);
                    setLoggedIn(true);
                    setApplicationIds(new Set(currUser.applications));
                } catch (error) {
                    console.error(error)
                    setCurrUser(null);
                    setLoggedIn(false);
                }
            }
            setInfoLoaded(true);
        }
        setInfoLoaded(false);
        userInfo();
    }, [token])

    async function signup(data) {
        let token = await JoblyApi.signup(data)
        if(token) {
            setToken(token);
        }
        
    }

    async function login(data) {
        let token = await JoblyApi.login(data);
        if(token) {
            setToken(token);
        }
        
    }

    function logout() {
        setCurrUser(null);
        setLoggedIn(false);
        setToken(null);
    }

    function hasApplied(id) {
        return applicationIds.has(id);
    }

    async function apply(username, jobId) {
        if (hasApplied(id)) return;
        let id = await JoblyApi.apply(username, jobId);
        setApplicationIds(new Set([...applicationIds, id]));
    }

    if(!infoLoaded) return <p>Loading...</p>;

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ currUser, setCurrUser, hasApplied, apply }}>
            <NavBar currUser={currUser} loggedIn={loggedIn} logout={logout}/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route element={<PrivateRoute />}>
                    <Route path="/companies" element={<CompanyList />}/>
                    <Route path="/companies/:handle" element={<CompanyDetail />}/>
                    <Route path="/jobs" element={<JobList />}/>
                    <Route path="/profile" element={<Profile currUser={currUser}/>}/>
                </Route>
                
        
                <Route path="/login" element={<LoginForm login={login}/>}/>
                <Route path="/signup" element={<SignupForm signup={signup}/>}/>
                
            </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default AppRoutes;