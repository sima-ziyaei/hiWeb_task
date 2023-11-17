import { useRef } from "react";
import Services from "../../service-call/services";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const setLocalStorageItems = (inputarray: any[]) => {
    for(let item of inputarray) {
      if( typeof item[1] == 'object'){
        setLocalStorageItems(Object.entries(item[1]))
      } else{
        localStorage.setItem(item[0], item[1]);
      }
    }

  }

  const validateByPassword = (e) => {
    e.preventDefault();
    Services.loginByAccessToken({ userName: userNameRef?.current?.value, passWord: passwordRef?.current?.value})
      .then((res) => {
        setLocalStorageItems(Object.entries(res))
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="bg-white flex justify-around items-center h-full">
      <img className="w-1/2 h-fit" src="/assets/loginImage.png" alt="girl" />
      <div className="w-1/2 flex flex-col items-center gap-28">
        <img src="/assets/hiweb.png" className="w-[136px] h-auto" />
        <form
          className="border border-solid border-[#9A9A9A] px-12 py-[58px] rounded-2xl flex flex-col gap-7"
          onSubmit={validateByPassword}
        >
          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="username">
              {" "}
              نام کاربری{" "}
            </label>
            <input
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              placeholder="نام کاربری..."
              type="text"
              ref={userNameRef}
              name="username"
              id="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#9A9A9A] " htmlFor="password"> کلمه عبور </label>

            <input
              type="text"
              className="bg-white text-[#9a9a9a] border border-solid border-[#9A9A9A] rounded-lg px-4 py-[13px] "
              ref={passwordRef}
              placeholder="کلمه عبور..."
              name="password"
              id="password"
            />
          </div>

          <button className="bg-[#46B666] w-full rounded-lg text-white py-3" type="submit">ورود</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
