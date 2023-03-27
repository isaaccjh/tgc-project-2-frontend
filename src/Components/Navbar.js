import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";



export default function() {
    return (<nav class="navbar navbar-expand-lg navbar-light bg-light px-0 py-3">
    <div class="container-xl">
      <a class="navbar-brand" href="#">
        <img src="" class="h-8" alt="Cocktail" />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav mx-lg-auto">
          <a class="nav-item nav-link active" href="#" aria-current="page">Home</a>
          <a class="nav-item nav-link" href="#">Explore</a>
          <a class="nav-item nav-link" href="#">Blog</a>
          <a class="nav-item nav-link" href="#">Contact</a>
        </div>
        <div class="navbar-nav ms-lg-4">
          <a class="nav-item nav-link" href="#">Sign in</a>
        </div>
        <div class="d-flex align-items-lg-center mt-3 mt-lg-0">
          <a href="#" class="btn btn-sm btn-primary w-full w-lg-auto">
            Register
          </a>
        </div>
      </div>
    </div>
  </nav>)
}