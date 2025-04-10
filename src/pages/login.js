export default function Login() {
  const handlesubmit = (e) => {
    alert("duudlaa");
  };
  return (
    <div className="h-[100vh] bg-[#004643] w-[100%] flex flex-col justify-center items-center flex-wrap">
      <form
        onSubmit={handlesubmit}
        className=" w-[350px] flex flex-col items-center "
      >
        <div className=" flex flex-col h-[10vh] w-[80%] max-w-[] justify-center gap-[5px]">
          <label for="id">
            <b className="text-[#E8E4E6] font-bold">Сурагчийн ID</b>
          </label>
          <input
            type="text"
            placeholder="Сурагчийн ID-г бичнэ үү."
            name="id"
            required
            className="w-[100%] bg-[#001E1D] h-[50px] text-[#E8E4E6] font-light pl-[20px] rounded-[15px] text-[15px]"
          ></input>
        </div>
        <div className=" flex flex-col h-[10vh] w-[80%] justify-center gap-[5px]">
          <label for="pass">
            <b className="text-[#E8E4E6] font-bold">Нууц үг</b>
          </label>
          <input
            type="password"
            placeholder="Нууц үгээ оруулна уу."
            name="pass"
            required
            className="w-[100%] bg-[#001E1D] h-[50px] text-[#E8E4E6] font-light pl-[20px] rounded-[15px] text-[15px]"
          ></input>
        </div>
        <button
          type="submit"
          className="bg-[#F9BC60] w-[80%] h-[50px] rounded-[15px] text-[#E8E4E6] font-black text-[20px] mt-[30px]"
        >
          Нэвтрэх
        </button>
      </form>
    </div>
  );
}
