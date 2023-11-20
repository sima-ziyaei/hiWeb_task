import { FC, useRef, useState } from "react";
import Services from "../service-call/services";
import Modal from "react-modal";
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { setProduct } from "../redux/productSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import t from "../../translate/fa.json";
import { useNavigate } from "react-router-dom";

const AddProduct: FC = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [fileUploaded, setFileUploaded] = useState();
  const hiddenFileInput = useRef(null);
  const [formData, setFormData] = useState({
    ProductTitle: "",
    ProductPrice: "",
    Description: "",
    file: null,
  });
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (e.target.name === "file") {
      setFileUploaded(e.target.files[0].name);
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.entries(formData).some((el) => el[1] === "" || el[1] === null)) {
      setError(true);
    } else {
      const addQueryParams = {
        count: Math.ceil((window.innerHeight - 180) / 290) * 4,
        skip: 0,
      };
      const data = new FormData();
      Object.entries(formData).forEach((el) => {
        data.append(el[0], el[1]);
      });

      Services.addProducts(data).then(() => {
        Services.getProducts(addQueryParams)
        .then((res) => {
            toast.success(t.product_added);
            dispatch(setProduct(res.list));
          })
          .catch((err) => {
            err.response.status == 401 ? navigate("/login") : "";
            toast.error(err?.message);
            console.error(err);
          });
      });
      setFileUploaded(null);

      setShowModal(false);
    }
  };

  const handleOpenFileBrowser = () => {
    hiddenFileInput.current.click();
  };

  const customStyles = {
    content: {
      borderRadius: "16px",
      backgroundColor: "#fff",
      width: "50%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className={` ${
          showModal ? "block" : "hidden"
        } fixed left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.35)]`}
      ></div>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="bg-[#46B666] rounded-lg text-white px-16 py-3"
      >
        {t.add_product}
      </button>
      <Modal
        style={customStyles}
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <HiMiniXMark
          onClick={() => setShowModal(false)}
          className="text-black self-end cursor-pointer"
        />
        <form
          className="flex flex-col gap-[18px] w-1/2"
          onSubmit={handleSubmit}
        >
          <h2 className="text-black"> </h2>

          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="ProductTitle">
              {t.product_name}
            </label>
            <input
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              placeholder={`${t.product_name}...`}
              type="text"
              name="ProductTitle"
              id="ProductTitle"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="price">
              {t.product_price}
            </label>

            <input
              type="number"
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              placeholder={`${t.product_price}...`}
              name="ProductPrice"
              id="ProductPrice"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="description">
              {t.description}
            </label>

            <textarea
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              placeholder="..."
              name="Description"
              id="Description"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="image">
              {t.upload_product_photo}
            </label>
            <div className="border border-solid border-[#b6b6b6] bg-white rounded-lg flex justify-between items-center ">
              <p className="text-[#a0a0a0] mb-0 mr-3"> {fileUploaded ?? 'jpeg،png'} </p>
              <div
                onClick={handleOpenFileBrowser}
                className="bg-[#c9c9c9] text-[#5c5c5c] py-3 px-6 rounded-lg w-fit self-end"
              >
                {t.choose_file}
              </div>
            </div>
            <input
              ref={hiddenFileInput}
              type="file"
              className="hidden"
              name="file"
              id="file"
              onChange={handleInputChange}
            />
          </div>
          <p className="text-[#FF6666] h-8">
            {error ? t.all_fields_are_required : null}
          </p>
          <div className="flex justify-between mt-5">
            <button
              onClick={() => setShowModal(false)}
              className="bg-white border-none text-[#5c5c5c] px-16 py-3 "
            >
              {t.cancel}
            </button>
            <button className="bg-[#46B666] rounded-lg text-white px-16 py-3">
              {t.submit_product}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddProduct;
