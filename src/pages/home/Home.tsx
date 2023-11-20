import { FC, useEffect, useState } from "react";
import Services from "../../service-call/services";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { InitialState, QueryParams } from "../../utils/interfaces";
import t from "../../../translate/fa.json";

export const queryParams: QueryParams = {
  count: Math.ceil((window.innerHeight - 180) / 290) * 4,
  skip: 0,
};

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalRowCount, setTotalRowCount] = useState<number>();

  const products = useSelector(
    (state: { product: InitialState }) => state.product.product
  );

  const getProducts = () => {
    Services.getProducts(queryParams)
      .then((res) => {
        if (res.totalRowCount > queryParams.skip + queryParams.count) {
          queryParams.skip += queryParams.count;
        }
        dispatch(setProduct(res.list));
        setTotalRowCount(res.totalRowCount);
      })
      .catch((err) => {
        err.response.status == 401 ? navigate("/login") : "";
        console.error(err);
      });
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      getProducts();
    }
  };

  useEffect(() => {
    if (queryParams.skip === 0) {
      getProducts();
    }
    if (totalRowCount !== products.length) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [window.scroll]);

  if (!products) return null;
  return (
    <>
      {!products?.length ? (
        <div className="flex items-center justify-center h-full flex-col">
          <img
            src="/assets/emptyList.png"
            alt="emptyList"
            className="w-[297px] h-auto "
          />
          <p className="text-[#ababab] mb-0 "> {t.inter_your_product} </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6 p-14">
            {products.map((el) => (
              <div
                key={el.id}
                className="shadow-[0px_2px_8px_0px_rgba(0,0,0,.10)] bg-white rounded-lg "
              >
                <img
                  src={el.imageUrl}
                  className="rounded-lg h-[180px] w-full"
                />
                <div className="p-[18px] flex flex-col items-start ">
                  <p className="text-black"> {el.title} </p>
                  <p className=" text-[#5C5C5C] "> {el.description} </p>
                  <p className=" text-[#5C5C5C] ">
                    {t.price} :<span className="text-black">{el.view}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {products.length !== totalRowCount && (
            <p className="w-full h-full  text-2xl text-center font-semibold text-gray-600">
              {t.loading}
            </p>
          )}
        </>
      )}
    </>
  );
};

export default Home;
