import { FC, useRef, useState } from "react";
import Services from "../../service-call/services";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import "../../App.css";
import t from '../../../translate/fa.json';

const Login : FC = () => {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const setLocalStorageItems = (inputarray) => {
    for (const item of inputarray) {
      if (typeof item[1] == "object") {
        setLocalStorageItems(Object.entries(item[1]));
      } else {
        localStorage.setItem(item[0], item[1]);
      }
    }
  };

  const validateByPassword = (e) => {
    e.preventDefault();

    if (
      userNameRef.current.value.trim() == "" ||
      passwordRef.current.value.trim() == ""
    ) {
      setError(t.all_fields_are_required);
      return;
    }
    Services.loginByAccessToken({
      userName: userNameRef?.current?.value,
      passWord: passwordRef?.current?.value,
    })
      .then((res) => {
        setLocalStorageItems(Object.entries(res));
        setShowLoading(true);
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="bg-white flex justify-around items-center h-full">
      <img className="w-1/2 h-fit" src="/assets/loginImage.png" alt="girl" />
      {showLoading ? (
        <div className="border border-solid border-[#9a9a9a] rounded-2xl flex flex-col items-center justify-center gap-12 py-20 px-28">
          <div className="rounded-full bg-[#57B872] w-16 h-16 text-white flex items-center justify-center text-3xl">
            <FiCheck />
          </div>
          <p className="mb-0 text-[#57b872]"> {t.you_entered_successfully} </p>
          <img src="/assets/loading.svg" className={"loadingAnimation"} />
        </div>
      ) : (
        <div className="w-1/2 flex flex-col items-center gap-28">
          <img src="/assets/hiweb.png" className="w-[136px] h-auto" />
          <form
            className="border border-solid border-[#9A9A9A] px-12 py-[58px] rounded-2xl flex flex-col gap-7"
            onSubmit={validateByPassword}
          >
            <div className="flex flex-col gap-2">
              <label className="text-[#9A9A9A] text-right" htmlFor="username">
                 {t.user_name}
              </label>
              <input
                className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
                placeholder={`${t.user_name}...`}
                type="text"
                ref={userNameRef}
                name="username"
                id="username"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#9A9A9A] text-right" htmlFor="password">
                 {t.password}
              </label>

              <input
                type="password"
                className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
                ref={passwordRef}
                placeholder={`${t.password}...`}
                name="password"
                id="password"
              />
            </div>
            <p className="text-[#FF6666] h-8">{error != "" ? error : null}</p>
            <button
              className="bg-[#46B666] w-full rounded-lg text-white py-3"
              type="submit"
            >
              {t.enter}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
