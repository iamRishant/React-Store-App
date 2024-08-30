import React, { useContext } from 'react'
import { ProductContext } from '../Utils/Context';
import { Link } from 'react-router-dom';

const Nav = () => {

  // we need distinct categories so we can use reduce functions
  // first we need products

  const [products] = useContext(ProductContext);

  let distinctCategory=products.reduce((acc,curr)=>[...acc,curr.category],[]);//reduce takes 2 fxn one is accumulator that stores value and curr which points at current value thn first one is a callback fxn which will return anything which we want(in this case we need array of distinct category) and second parameter wil have initial value of acc

  // console.log(distinctCategory);//we got all the categories now we need unique so we wil use set

  distinctCategory=[...new Set(distinctCategory)];
  // console.log(distinctCategory);
  return (
    <nav className="w-[15%] h-full bg-zinc-300 flex flex-col items-center pt-5">
        <Link to="/create"
          className="px-4 py-2 border-2 bg-red-600 text-white rounded-lg mb-3 hover:bg-red-700"
        >
          Add New Product
        </Link>
        <hr className="w-[60%]" />
        <h1 className="text-2xl w-[80%] font-semibold">Category Filter</h1>
        <ul className="w-[60%]">
          {
            distinctCategory.map((category,i)=>{
              return <div key={i} className='flex items-center gap-3'>
              <div className='h-3 w-3 mt-3 bg-red-400 rounded-full'></div><Link to={`?category=${category}`} className="mt-3 text-sm cursor-pointer font-md hover:text-blue-600 hover:scale-105">{category}</Link>
              </div>
            })
          }
          
        </ul>
      </nav>
  )
}

export default Nav
