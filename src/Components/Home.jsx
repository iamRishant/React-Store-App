import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import Loading from "./Loading";
import axios from "../Utils/axios";
import Edit from "./Edit";

const Home = () => {
  const [products] = useContext(ProductContext);
  // console.log(products);
  // ab jo search bar me url me jo value category par click krne par aarha hai wo kaise milega wo milege use Location use krne se ye react router dom ka part hai
  const {search}=useLocation();
  // console.log(search);
  // first we will split it and we will get an array and we need the second element
  let category=search.split("=");
  // console.log(category);
  // console.log(category[1]);
  // but it is encoded so we need to decode it to string with help of decode URIComponent
  category=decodeURIComponent(category[1]);
  // console.log(category);

  // we need filterred products to initially filtered products sara product rhega par jab category par click krenge to filtered products update hoga

  // console.log(products);

  const [filteredProd,setFilteredProd] = useState(null);
  // setFilteredProd(products);
  // console.log(filteredProd);


// since we are calling data from local storage we dont need this below api call

  // const getProdCategory=async ()=>{
  //   try {
  //     const {data}=await axios.get(`products/category/${category}`);
  //     // console.log(data);
  //     setFilteredProd(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
useEffect(()=>{
  // if url khalii hai then undefined value aaega category so uss waqt call nhi krenge
  // initially ho skya hai koi value na ho par jab aajae value then update krr dena hai
  // jab home par click krenge to category phir se chnange hoga uss waqt sara products dikhna chahiye
  if(!filteredProd || category=="undefined") setFilteredProd(products);
  if(category!="undefined"){
    //  getProdCategory();//since we are not using api we will not call this fxn
    // so now we will use filter
    // we will need products which matches category
    const fillprod=products.filter((prod)=>prod.category==category);
    // console.log(fillprod);
    setFilteredProd(fillprod);
    }
},[category,products])//jab jab category change hoga wo rerender hoga
  
  

  return products ? ( 
    <>
      <Nav />
      <div className="w-[85%] h-ful p-4 pt-[5%] flex flex-wrap overflow-y-auto overflow-x-hidden">
        { filteredProd && filteredProd.map((p, i) => {
          return (
            <Link
              key={i}
              to={`/details/${p.id}`}
              className="card border-2 p-4 h-[40vh] w-[24%] text-center mb-2 mr-2"
            >
              {/* to add dynamic image url we have to use style tailwind dont support url like that bg-[url(${p.image})] this wont work */}
              <div style={{backgroundImage:`URL(${p.image})`}} className={`hover:scale-110 w-[full] h-[80%] bg-contain bg-no-repeat bg-center mb-3`}></div>
              <h1 className="text-xs">{p.title}</h1>
            </Link>
          );
        })}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
