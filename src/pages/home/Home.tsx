import { useEffect, useState } from "react";
import Services from "../../service-call/services";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../redux/productSlice";
import { loginValidation } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import HomeSkeleton from "./HomeSkeleton";

interface List {
  description: string;
  id: string;
  imageUrl: string;
  rate: number;
  title: string;
  view: number;
}

interface Product {
  totalRowCount: number;
  list: List[];
  exception: string;
}

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => (!loginValidation() ? navigate("/login") : undefined), []);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const queryParams = {
    count: 12,
    skip: skip,
    orderBy: "title",
  };

  const products = useSelector((state) => state.product.product);

  const getProducts = () => {
    setLoading(true);

    Services.getProducts(queryParams).then((res) => {
      dispatch(setProduct(res));
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (!products) return null;
  return (
    <>
      {loading ? (
        <HomeSkeleton />
      ) : products.list?.length ? (
        <>
          <div className="grid grid-cols-4 gap-6 p-14">
            {products.list.map((el) => (
              <div className="shadow-[0px_2px_8px_0px_rgba(0,0,0,.10)] bg-white rounded-lg ">
                <img
                  src={el.imageUrl}
                  className="rounded-lg h-[180px] w-full"
                />
                <div className="p-[18px] ">
                  <p className="text-black"> {el.title} </p>
                  <p className=" text-[#5C5C5C] "> {el.description} </p>
                  <p className=" text-[#5C5C5C] ">
                    {" "}
                    قیمت : <span className="text-black">{el.view}</span>{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <img
            src="/assets/emptyList.png"
            alt="emptyList"
            className="w-[297px] h-auto "
          />
          <p className="text-[#ababab] mb-0 "> محصول خود را وارد نمایید. </p>
        </div>
      )}
    </>
  );
};

export default Home;
