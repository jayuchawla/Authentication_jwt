import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import PageNotFound from "./components/PageNotFound";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Username from "./components/Username";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route exact path="/" element={<Username />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/password" element={<Password />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/recovery" element={<Recovery />}></Route>
                    <Route path="/reset" element={<Reset />}></Route>
                    <Route path="*" element={<PageNotFound />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}