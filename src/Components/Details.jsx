import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../Utils/Context';
import axios from '../Utils/axios';
import { data } from 'autoprefixer';
import Loading from './Loading';
import { toast } from 'react-toastify';

const Details = () => {
  // const id=useParams();//this line will give an object so we will destructure it
  const {id}=useParams();
  // console.log(id);

  // we got the id which product is clicked now we have to filter out from data whose id is selected so first we need data
  const [products,setProducts] = useContext(ProductContext);
  // console.log(products);

  // now we need currecnt data 
  // we can also use filter

  const [singleProd,setSingleProd] = useState(null);
  // all the products

  // const getSingleProduct=async()=>{
  //   try {
  //     const {data}=await axios.get(`/products/${id}`);
  //     // console.log(data);
  //     setSingleProd(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // lets destructure data elements
  // console.log(data);
  // console.log(singleProd.image);

  // now we will try to filter out data instead of calling it from api so we will comment the above part and also comment the getsingle product fxn inside use effect

  // filter method
  useEffect(()=>{
    // getSingleProduct();
    if(!singleProd){
      const data=products.filter((prod)=>prod.id==id);
      // console.log(data[0]);
      setSingleProd(data[0]);
      // console.log(singleProd);
    }
  },[id]);

  // delete
  const navigate=useNavigate();
  const deleteHandler=(id)=>{
    const newProds=products.filter((prod)=>prod.id!=id);
    setProducts(newProds);
    localStorage.setItem("products",JSON.stringify(newProds));
    navigate("/");
    toast.success("Product deleted successfully");
  }


  return singleProd ? ( 
    <div className=' w-[70%] h-full m-auto flex py-[10%] gap-[8%] px-[8%] items-center '>

    
    <img className='w-[60%] h-[90%] object-contain' src={`${singleProd.image}`} alt="" />
    <div className='content'>
        <h1 className='text-4xl mb-2'>{singleProd.title}</h1>
        <h2 className='text-zinc-400'>{singleProd.category}</h2>
        <h3 className='text-green-500 mb-3'>$ {singleProd.price}</h3>
        <p className='text-sm mb-10'>{singleProd.description}</p>
        <Link to={`/edit/${singleProd.id}`} className='px-5 py-2 border mr-6 bg-gray-400 font-semibold text-white'>Edit</Link>
        <button onClick={()=>deleteHandler(singleProd.id)} className='px-5 py-2 border bg-red-400 font-semibold text-white'>Delete</button>
    </div>
        
    </div>
  ):(<Loading/>)
}

export default Details
 