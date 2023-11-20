import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import { FC } from "react";
import { toast, ToastContainer } from "react-toastify";
import t from "../../translate/fa.json";

export const Navbar: FC = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  
  const logout = () => {
    toast.warning(t.logout_message);
    localStorage.clear();
    setTimeout(() => navigate("/login"),1000);
  };

  return (
    <>
      <div className="flex w-full justify-between py-6">
        <p className="text-black mb-0"> {t.product_list} </p>

        <div className="flex gap-6 items-center">
          <AddProduct />

          <p className="text-black mb-0"> {userName} </p>

          <div
            onClick={logout}
            className="flex gap-1 cursor-pointer items-center"
          >
            <img src="/assets/logout.svg" />
            <p className="mb-0 text-[#F66]"> {t.exit} </p>
          </div>
        </div>
      </div>
      <div className="bg-[#A0A0A0] h-[1px] w-full "></div>
      <ToastContainer />
    </>
  );
};
