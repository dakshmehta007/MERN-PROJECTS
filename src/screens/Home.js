import React,{useEffect,useState} from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import poster from '../poster.png'
import poster1 from '../poster1.png'
import poster2 from '../poster2.png'



export default function Home() {

  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);
  const [search,setSearch] = useState('');

  const loadData = async()=>{
    let response = await fetch("http://localhost:5000/api/foodData",{
      method :"POST",
      headers:{ 
        'Content-Type':'application/json'
      }
    });

    response = await response.json();
    // console.log(response[1]) 
    setFoodItem(response[0] || []);
    setFoodCat(response[1] || []);

  }

  useEffect(()=>{
    loadData()
  },[])

 

  return (
    <>
      <div><Navbar /></div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
    <div className="carousel-inner" id="carousel">
    <div className='carousel-caption' style={{zIndex:"10"}}>
    <form className="d-flex">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value) }} />
        <button className="btn btn-outline-success text-white bg-success my-2 my-sm-0" type="submit">Search</button>
    </form> 
    </div>
        <div className="carousel-item active">
        <img src={poster} style={{filter :"brightness(50%)"}} className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
        <img src={poster1} style={{filter :"brightness(50%)"}} className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
        <img src={poster2} style={{filter :"brightness(50%)"}} className="d-block w-100" alt="..."/>
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
      


<div className='container'>
  {foodCat.length > 0 ? (
    foodCat.map((data) => (
      <div key={data._id} className='row mb-3'>
        <div className='fs-3 m-3'>
          {data.CategoryName}
          <hr />
          <div className='row'>
            {foodItem.length > 0 ? (
              foodItem
                .filter(
                  (item) =>
                    item.CategoryName === data.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((filterItems) => (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodItem={filterItems} options={filterItems.options[0]} />
                  </div>
                ))
            ) : (
              <div>No Such Data Found</div>
            )}
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>No categories found</div>
  )}
</div>


      <div><Footer /></div>
    </>
  );
}
