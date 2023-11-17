import { useRef, useState } from "react";
import Services from "../service-call/services";
import Modal from "react-modal";

const AddProduct = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fileUploaded, setFileUploaded] = useState();
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    setFileUploaded(event.target.files[0]);
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
      alignItems: "center",
      justifyContent: "center",
    },
  };
  console.log(fileUploaded);
  const body = {
    title: "مبل",
    price: 30000,
    description:
      "مبل زیبای لاریسا یک مبل بسیار راحت و با کیفیت و پر طرفدار است که با طراحی به خصوصی خود می تواند زیبایی بی نظیری...",
    imageUrl: "",
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
        
        <div className="flex flex-col gap-[18px] w-1/2">
          <h2 className="text-black"> افزودن محصول </h2>

          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="productName">
              نام محصول
            </label>
            <input
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              placeholder="نام محصول..."
              type="text"
              //   ref={productNameRef}
              name="productName"
              id="productName"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="price">
              {" "}
              قیمت محصول{" "}
            </label>

            <input
              type="text"
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              //   ref={priceRef}
              placeholder="قیمت محصول..."
              name="price"
              id="price"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="price">
              {" "}
              قیمت محصول{" "}
            </label>

            <input
              type="text"
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              //   ref={priceRef}
              placeholder="قیمت محصول..."
              name="price"
              id="price"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="description">
              {" "}
              توضیحات{" "}
            </label>

            <textarea
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              //   ref={descriptionRef}
              placeholder="..."
              name="description"
              id="description"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="image">
              {" "}
              بازگذاری عکس محصول{" "}
            </label>
            <div className="border border-solid border-[#b6b6b6] bg-white rounded-lg flex justify-between items-center ">
              <p className="text-[#a0a0a0] mb-0 mr-3"> {fileUploaded?.name} </p>
              <div
                onClick={handleClick}
                className="bg-[#c9c9c9] text-[#5c5c5c] py-3 px-6 rounded-lg w-fit self-end"
              >
                {" "}
                انتخاب فایل{" "}
              </div>
            </div>
            <input
              ref={hiddenFileInput}
              type="file"
              onChange={handleChange}
              className="hidden"
              //   ref={imageRef}
              name="image"
              id="image"
            />
          </div>
          <div className="flex justify-between mt-5">
            <button onClick={()=> setShowModal(false)} className="bg-white border-none text-[#5c5c5c] px-16 py-3 "> انصراف </button>
            <button onClick={()=> Services.addProducts(body)} className="bg-[#46B666] rounded-lg text-white px-16 py-3"> ثبت محصول </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddProduct;
