import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../index.css"



export default function Navbar () {
    return (
        <nav className=" navbar navbar-expand-lg px-0 py-3 navbar-color mb-0">
            <div className="container-xl">
                <a className="navbar-brand" href="#">
                    <img src={require("../Sparkle.png")} id="image" style={{"height":"32px", "width":"32px", "scale": "3.5"}} className="h-8" alt="Cocktail" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav mx-lg-auto">
                        <a className="nav-item nav-link active" href="#" aria-current="page">Home</a>
                        <a className="nav-item nav-link" href="#">Explore</a>
                        <a className="nav-item nav-link" href="#">Blog</a>
                        <a className="nav-item nav-link" href="#">Contact</a>
                    </div>
                    <div className="navbar-nav ms-lg-4">
                        <a className="nav-item nav-link" href="#">Sign in</a>
                    </div>
                    <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                        <a href="#" className="btn btn-sm btn-primary w-full w-lg-auto">
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}