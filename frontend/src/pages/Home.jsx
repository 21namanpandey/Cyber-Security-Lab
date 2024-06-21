
import { clearAllUserError } from "@/store/slices/userSlice";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
    const { isAuthenticated, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const navigateTo = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUserError());
        }
        if (!isAuthenticated) {
            navigateTo("/signup");
        }
    }, [isAuthenticated]);

    return (
        <>
        <div className=" font-extrabold  justify-center items-center flex text-5xl min-h-screen">Login Successfully</div>
        </>
    );
};

export default Home;
