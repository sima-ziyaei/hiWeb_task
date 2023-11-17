import { useEffect, useState } from "react";
import Services from "../../service-call/services";

interface List {
    description: string,
    id: string,
    imageUrl: string,
    rate: number,
    title: string,
    view: number
}

interface Product {
    totalRowCount: number,
    list: List[],
    exception:string
}

const Home = () => {
  const [products, setProducts] = useState<Product>();

  useEffect(() => {
    Services.getProducts().then((res) => setProducts(res));
  }, []);
  console.log(products);
  if(!products) return null;
  return <>
    {products.list.length ? (
      <div className="grid grid-cols-4 gap-6 p-14">
        {products.list.map((el)=>
        <div className="shadow-[0px_2px_8px_0px_rgba(0,0,0,.10)] bg-white rounded-lg ">
            <img src={el.imageUrl} className="rounded-lg" />
            <div className="p-[18px] ">

            <p className="text-black"> {el.title} </p>
            <p className=" text-[#5C5C5C] "> {el.description} </p>
            <p className=" text-[#5C5C5C] " > قیمت : <span className="text-black">{el.view}</span>  </p>
            </div>
        </div>
        )}
      </div>
    ) : (
      <div>
        <img src="/assets/emptyList.png" alt="emptyList" />
      </div>
    )}
  </>;
};

export default Home;
