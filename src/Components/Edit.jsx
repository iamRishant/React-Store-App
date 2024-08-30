import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Utils/Context";
// we need to give id to new product so we will install a package called nanoid
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  
  const [products,setProducts] = useContext(ProductContext);
  const navigate=useNavigate();
  const {id}=useParams();
  const [singleProd,setSingleProd]=useState({
    title:"",
    image:"",
    category:"",
    price:"",
    description:"",
  });

  const changeHandler=(e)=>{
    // console.log(e.target.name,e.target.value);
    // now we want ki jab bhi kissy section me koi chnage ho then single prod ko update krde
    setSingleProd({...singleProd,[e.target.name]:[e.target.value]});
  }


  useEffect(()=>{
    setSingleProd(products.filter((p)=>p.id==id)[0])
  },[id])
  // console.log(singleProd);
  
//   lets get previous data

const AddItemHandler=(e)=>{
    e.preventDefault();
// trim fxn removes extra spaces

    if(singleProd.title.trim().length<5 || singleProd.image.trim().length<5 || singleProd.description.trim().length<5 || singleProd.price.length<1 || singleProd.category.trim().length<5){
        alert("Please fill all the fields.Every field must have atleast 4 characters");
        return;
    }
    else{

      const pi=products.findIndex((p)=>p.id==id);//we got the index of that item which is being edited

      const copyData=[...products];//copy all the products data then we will just overwrite that index
      copyData[pi]={...products[pi],...singleProd};

      console.log(copyData);
        
        setProducts(copyData);
        // alert("Product edited successfully");

        localStorage.setItem("products",JSON.stringify(copyData));//local storage store in the form of string 
        // // localStorage.setItem("products",JSON.stringify(products));//sidhe products nhi likhe coz may be product aane me late ho asynchornous ho to product aaya nhi and local storage store krr lega to may be data store last wala na ho to bss uske liye upar wala use krr
        navigate(-1);
        toast.success("Product edited successfully");
        
    }
  }
  return (
    <form onSubmit={AddItemHandler}
      action=""
      className="p-[5%] w-screen h-screen flex flex-col items-center"
    >
      <h1 className="text-3xl w-1/2 mb-5">Edit Item</h1>
      <input
        value={singleProd && singleProd.title}
        onChange={changeHandler} 
        name="title"
        type="text"
        className="w-1/2 text-2xl bg-zinc-200 p-2 rounded-md mb-4 "
        placeholder="Title"
      />
      <input
        value={singleProd && singleProd.image}
        onChange={changeHandler} 
        name="image"
        type="url"
        className="w-1/2 text-2xl bg-zinc-200 p-2 rounded-md mb-4"
        placeholder="Image Link"
      />
      <div className="flex justify-between w-1/2">
        <input
          value={singleProd && singleProd.category}
          onChange={changeHandler} 
          name="category"  
          type="text"
          className="w-[48%] text-2xl bg-zinc-200 p-2 rounded-md mb-4 "
          placeholder="Category"
        />
        <input
          value={singleProd && singleProd.price}
          onChange={changeHandler} 
          name="price"
          type="number"
          className="w-[48%] text-2xl bg-zinc-200 p-2 rounded-md mb-4"
          placeholder="Price"
        />
      </div>
      <textarea
        value={singleProd && singleProd.description}
        onChange={changeHandler} 
        name="description"  
        type="text"
        className="w-[50%] text-2xl bg-zinc-200 p-2 rounded-md mb-4 "
        placeholder="Description"
        rows="6"
      ></textarea>
      <div className="w-1/2">
      <button
          className="cursor-pointer self-start px-4 py-2 border-2 bg-red-600 text-white rounded-lg mb-3 hover:bg-red-700"
        >
          Edit Product
        </button>
      </div>
    </form>
  )
}

export default Edit
