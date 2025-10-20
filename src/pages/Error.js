import React from "react";
import { useRouteError } from "react-router-dom";
import classes from '../styles/pages/Error.module.css';
import { Link } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    let title = "An error occured!";
    let message = "Something went wrong";

    if(error.status === 500){
        message = JSON.parse(error.data).message;
    }

    if(error.status === 404){
        title = "Page Not Found!";
        message = "Could not find resource or page";
    }

    return (
        <div className={classes.errorPage}>
            <div className={classes.errorContent}>
                <h2 className={classes.errorStatus}>{error.status}</h2>
                <h3 className={classes.errorTitle}>{title}</h3>
                <p className={classes.errorMsg}>{message}</p>
                <Link to="/" className={classes.goHomeBtn}>Go Home</Link>
            </div>
        </div>
    )
}

export default Error;