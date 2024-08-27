import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


export default function Carousel() {
  return (
    <>

    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
    <div className="carousel-inner" id="carousel">
    <div className='carousel-caption' style={{zIndex:"10"}}>
    <form className="d-flex">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success text-white bg-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    </div>
        <div className="carousel-item active">
        <img src="https://via.placeholder.com/700" style={{filter :"brightness(30%)"}} className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
        <img src="https://via.placeholder.com/700" style={{filter :"brightness(30%)"}} className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
        <img src="https://via.placeholder.com/700" style={{filter :"brightness(30%)"}} className="d-block w-100" alt="..."/>
        </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
    </div>
    </>
  )
}
