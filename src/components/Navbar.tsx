import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";

export const Navbar = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="flex w-full justify-between py-6">
        <p className="text-black mb-0"> لیست محصولات </p>

        <div className="flex gap-6 items-center">
          <AddProduct />

          <p className="text-black mb-0"> {userName} </p>

          <div
            onClick={logout}
            className="flex gap-1 cursor-pointer items-center"
          >
            <img src="/assets/logout.svg" />
            <p className="mb-0 text-[#F66]"> خروج </p>
          </div>
        </div>
      </div>
      <div className="bg-[#A0A0A0] h-[1px] w-full "></div>
    </>
  );
};

// default Navbar;
