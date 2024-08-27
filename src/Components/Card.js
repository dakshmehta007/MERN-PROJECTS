import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';

export default function Card(props) {

  let data=useCart();
  const priceRef=useRef();
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const[qty,setQty]=useState(1);
  const[size,setSize]=useState("");

  const handleAddToCard = async()=>{
    let food=[]
    for(const item of data){
      if(item.id===props.foodItem._id){
        food = item;

        break;
      }
    }
    if(food != []){  
      if(food.size ===size){
        await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice ,qty:qty})
        return ;
      }
      else if(food.size !==size){
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size});
        return ;
      }
      return ;
    }
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size});
    // await console.log(data);
  }
  let finalPrice=qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[]) 

  
  // console.log(props.foodItem.foodName);
  return (
    <>
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px", margin: "10px"}}>
      <img src={props.foodItem.img} className="card-img-top" alt="not Loading" style={{height:"120px", objectFit:"fill"}}/>
      <div className="card-body">
        <p className="card-text">{props.foodItem.name}</p>
        <div className='container w-100'></div>
        <select className="m-2 h-100 bg-success rounded" onChange={(e)=>{setQty(e.target.value)}}>
          {Array.from(Array(6),(e,i)=>{
            return (
              <option key={i+1} value={i+1}>{i+1}</option>
            )
          })}
        </select> 
        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
          
          {priceOptions.map((data)=>{
            return <option key={data} value={data}>{data}</option>
          })}
        </select>
        <div className='d-inline h-100 fs-5'>
          {finalPrice}/-
        </div>
      </div>
      <hr />
      <button className={'btn bg-success justify-centre ms-2'} onClick={handleAddToCard} >Add To Cart</button>
    </div>
    </>
  )
}
 