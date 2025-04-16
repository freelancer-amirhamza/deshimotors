import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Divider from './Devider';
import { DisplayPriceInTaka } from '../utils/DisplayPriceInTaka';
import image1 from "../assets/minute_delivery-Bu9utzxK.png"
import image2 from "../assets/Best_Prices_Offers-CbMh73zQ.png"
import image3 from "../assets/Wide_Assortment-CbRiDBkF.png";

const ProductDetailsPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData]= useState({
    name: "",
    image: [],
  })
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);

  const fetchProductDetails = async()=>{
    try {
      setLoading(true)
      const response = await Axios({
        ...SummeryApi.getProductDetails,
        data: {
          productId
        }
      })
      if (response.data?.success) {
        setData(response.data?.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  const handleScrollLeft= ()=>{
    if(image > 0){
      setImage(image - 1)
    }
    if(image < 0){
      image(data?.image?.length - 1)
    }
  }
  const handleScrollRight = ()=>{
    if(image < data?.image?.length - 1){
      setImage(image + 1)
    }
    if(image > data?.image?.length - 1){
      setImage(data?.image?.length - 1)
    }
  }

  console.log(data, "data")
  useEffect(()=>{
    fetchProductDetails()
  },[params])
  console.log(productId, "productId")
  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 bg-slate-100 '>
    <div className="col-span-1">
      <div className="w-full h-full min-h-56 max-h-56 lg:min-h-[65vh] lg:max-h-[65vh] rounded bg-white">
        <img 
        className='w-full h-full object-scale-down'
        src={data.image[image]} alt={data.name} />
      </div>
      <div className="flex justify-center items-center my-2 gap-3 ">
        {data?.image?.map((img, index)=>{
          return(
            <div key={img+index+"point"} className={` bg-slate-200 w-5 h-5 rounded-full ${index === image && "bg-slate-300  " } `}></div>
          )
        })}
      </div> 
      <div className="grid relative">
        <div className="flex w-full z-10 items-center justify-center reletive overflow-x-auto gap-2 no-scrollbar my-4">
          {data?.image?.map((img, index) => (
            <div 
              key={img + index + "point"} 
              className={`w-24 h-24 min-w-20 rounded-lg min-h-24 ${index === image ? "border-2 border-slate-300" : ""}`}
            >
              <img
                onClick={() => setImage(index)}
                className="h-full w-full object-scale-down rounded-lg cursor-pointer"
                src={img}
                alt={data.name}
              />
            </div>
          ))}
        </div>
        <div className="absolute lg:flex hidden items-center w-full h-full -ml-3 justify-between ">
          <button onClick={handleScrollLeft} className=' relative z-10 bg-slate-200 p-1.5 shadow-lg  hover:bg-slate-300  cursor-pointer rounded-full' >
            <FaAngleLeft/>
          </button>
          <button onClick={handleScrollRight} className=' relative z-10 bg-slate-200 p-1.5 shadow-lg  hover:bg-slate-300   cursor-pointer rounded-full' >
            <FaAngleRight/>
          </button>
        </div>
      </div>
      <Divider/>
      <div className="grid gap-2">
        <h1 className="text-2xl font-medium text-neutral-800">Product Description</h1>
        <p className="text-base font-medium">{data?.description}</p>
      </div>
    </div>
    <div className="col-span-1">
      <div className="text-base lg:text-lg gap-4 grid">
        <div className="">
        <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
      <h2 className='text-lg font-semibold text-neutral-700 lg:text-3xl'>{data.name}</h2>  
      <p className=''>{data.unit}</p> 
        </div>
      <Divider/>
      <div className="grid gap-2">
        <p className="">Price</p>
        <div className="flex items-center gap-2">
          <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
            <p className="text-green-600 font-semibold text-xl">{DisplayPriceInTaka(data?.price)}</p>
          </div>
          {data?.discount && (
              <p className="line-through text-neutral-500 text-xl">{DisplayPriceInTaka(data?.price)} </p>
          )}
          {data?.discount && (
             <div className="flex items-center gap-2">
            <p className="text-green-600 font-semibold text-3xl">{data?.discount}%</p>
            <p className="text-xl text-neutral-600">Discount</p>
          </div>
          )}
        </div>
        <button className='w-fit bg-green-500 py-1 px-3 text-xl rounded text-white' >Add</button>
      </div>
      <Divider/>
      <div className="grid gap-2">
        <h1 className="text-2xl font-medium text-neutral-800">Why shop from binkeyit?</h1>
        <div className="flex  gap-2 items-center">
          <img className='min-h-20 max-h-24 min-w-20 max-w-24 object-scale-down'
           src={image1} alt="Super fast delyvery" />
          <div className="">
            <h2 className="text-xl font-semibold">Superfast Delivery</h2>
            <p className="text-base font-medium">Get your orer delivered to your doorstep at the earliest from dark stores near you.</p>
          </div>
        </div>
        <div className="flex  gap-2 items-center">
          <img className='min-h-20 max-h-24 min-w-20 max-w-24 object-scale-down'
           src={image2} alt="Super fast delyvery" />
          <div className="">
            <h2 className="text-xl font-semibold">Best Prices & Offers</h2>
            <p className="text-base font-medium">Best price destination with offers directly from the nanufacturers.

</p>
          </div>
        </div>
        <div className="flex  gap-2 items-center">
          <img className='min-h-20 max-h-24 min-w-20 max-w-24 object-scale-down'
           src={image3} alt="Super fast delyvery" />
          <div className="">
            <h2 className="text-xl font-semibold">Wide Assortment</h2>
            <p className="text-base font-medium">Choose from 5000+ products across food personal care, household & other categories.</p>
          </div>
        </div>
      </div>
      {/* <Divider/>
      <div className="grid gap-2">
        <h1 className="text-2xl font-medium text-neutral-800">Product Description</h1>
        <p className="text-base font-medium">{data?.description}</p>
      </div> */}
      </div>
    </div>
    </section>
  )
}

export default ProductDetailsPage