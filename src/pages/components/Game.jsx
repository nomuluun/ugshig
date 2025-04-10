export default function Game() {
  return (
    <div
      className="bg-[#E8E4E6] h-[22vh] w-[80%] rounded-[30px] flex flex-col-reverse"
    >
      <div className=" bg-[#F9BC60] w-[100%] h-[40%] flex flex-col gap-[10px] justify-center items-center rounded-b-[30px]">
        <div className=" w-[100%] h-[40%] flex flex-row justify-between items-center px-[10%]">
          <h1 className="font-black">ЖУРАМЛАСАН ҮГС</h1>
          <h3 className="font-black">түвшин 1</h3>
        </div>
        <div className="w-[80%] bg-[#ABD1C6] rounded-full h-2.5 ">
          <div className="bg-[#004643] h-2.5 rounded-full w-[45%]"></div>
        </div>
      </div>
    </div>
  );
}
