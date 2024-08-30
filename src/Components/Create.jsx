import React, { useContext, useState } from "react";
import { ProductContext } from "../Utils/Context";
// we need to give id to new product so we will install a package called nanoid
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Create = () => {

  const navigate=useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

//   lets get previous data
const [products,setProducts] = useContext(ProductContext);

const AddItemHandler=(e)=>{
    e.preventDefault();
// trim fxn removes extra spaces

    if(title.trim().length<5 || image.trim().length<5 || description.trim().length<5 || price.trim().length<1 || category.trim().length<5){
        alert("Please fill all the fields.Every field must have atleast 4 characters");
        return;
    }
    else{

        const product={
            id:nanoid(),
            title,
            image,
            category,
            price,
            description,
        }
        setProducts([...products,product]);
        // alert("Product added");
        toast.success("Product added successfully");

        localStorage.setItem("products",JSON.stringify([...products,product]));//local storage store in the form of string 
        // localStorage.setItem("products",JSON.stringify(products));//sidhe products nhi likhe coz may be product aane me late ho asynchornous ho to product aaya nhi and local storage store krr lega to may be data store last wala na ho to bss uske liye upar wala use krr
        navigate("/");
        
    }
    // console.log(products);
    }

  return (
    <form onSubmit={AddItemHandler}
      action=""
      className="p-[5%] w-screen h-screen flex flex-col items-center"
    >
      <h1 className="text-3xl w-1/2 mb-5">Add New Items</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="w-1/2 text-2xl bg-zinc-200 p-2 rounded-md mb-4 "
        placeholder="Title"
      />
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="url"
        className="w-1/2 text-2xl bg-zinc-200 p-2 rounded-md mb-4"
        placeholder="Image Link"
      />
      <div className="flex justify-between w-1/2">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          className="w-[48%] text-2xl bg-zinc-200 p-2 rounded-md mb-4 "
          placeholder="Category"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          className="w-[48%] text-2xl bg-zinc-200 p-2 rounded-md mb-4"
          placeholder="Price"
        />
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        className="w-[50%] text-2xl bg-zinc-200 p-2 rounded-md mb-4 "
        placeholder="Description"
        rows="6"
      ></textarea>
      <div className="w-1/2">
      <button
          className="cursor-pointer self-start px-4 py-2 border-2 bg-red-600 text-white rounded-lg mb-3 hover:bg-red-700"
        >
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
