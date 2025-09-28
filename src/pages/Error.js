import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.log(error);
    let title = "An error occured!";
    let message = "Something went wrong";

    if(error.status === 500){
        message = JSON.parse(error.data).message;
    }

    if(error.status === 404){
        title = "Not Found!";
        message = "Could not find resource or page";
    }

    return (
        <p>{message}</p>
    )
}

export default Error;