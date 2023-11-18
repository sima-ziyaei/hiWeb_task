import { useRef, useState } from "react";
import Services from "../service-call/services";
import Modal from "react-modal";
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { setProduct } from "../redux/productSlice";

const AddProduct = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [fileUploaded, setFileUploaded] = useState();
  const hiddenFileInput = useRef(null);
  const [formData, setFormData] = useState({
    ProductTitle: "",
    ProductPrice: "",
    Description: "",
    file: null,
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (e.target.name === "file") {
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

    const data = new FormData();
    data.append("ProductTitle", formData.ProductTitle);
    data.append("ProductPrice", formData.ProductPrice);
    data.append("Description", formData.Description);
    data.append("file", formData.file);

    Services.addProducts(data).then(()=>{
      Services.getProducts().then((res)=>{
        dispatch(setProduct(res))
      })
    });
    setFileUploaded(null);

    setShowModal(false);
  };

  const handleOpenFileBrowser = (event) => {
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
        افزودن محصول
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
          <h2 className="text-black"> افزودن محصول </h2>

          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="ProductTitle">
              نام محصول
            </label>
            <input
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              placeholder="نام محصول..."
              type="text"
              name="ProductTitle"
              id="ProductTitle"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="price">
              قیمت محصول
            </label>

            <input
              type="text"
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              placeholder="قیمت محصول..."
              name="ProductPrice"
              id="ProductPrice"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="description">
              توضیحات
            </label>

            <textarea
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              //   ref={descriptionRef}
              placeholder="..."
              name="Description"
              id="Description"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="image">
              بازگذاری عکس محصول
            </label>
            <div className="border border-solid border-[#b6b6b6] bg-white rounded-lg flex justify-between items-center ">
              <p className="text-[#a0a0a0] mb-0 mr-3"> {fileUploaded?.name} </p>
              <div
                onClick={handleOpenFileBrowser}
                className="bg-[#c9c9c9] text-[#5c5c5c] py-3 px-6 rounded-lg w-fit self-end"
              >
                انتخاب فایل
              </div>
            </div>
            <input
              ref={hiddenFileInput}
              type="file"
              // onChange={handleImageChange}
              className="hidden"
              name="file"
              id="file"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between mt-5">
            <button
              onClick={() => setShowModal(false)}
              className="bg-white border-none text-[#5c5c5c] px-16 py-3 "
            >
              انصراف
            </button>
            <button className="bg-[#46B666] rounded-lg text-white px-16 py-3">
              ثبت محصول
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddProduct;
