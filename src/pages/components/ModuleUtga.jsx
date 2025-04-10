import Link from "next/link";
export default function ModuleUtga() {
  return (
    <div className="w-[80%] border bg-[#F9BC60] p-10 rounded-[30px] flex flex-col justify-around gap-[20px] pl-[20px] shadow-2xl">
      <Link href="/ugutga">
        <h1 className="text-[#004643] font-black text-[20px]">ҮГИЙН УТГА</h1>
        <h3 className="text-[#FFFFFF] font-black text-[15px] pt-[10px] ">
          Монгол үгийн утгыг хэр сайн мэдэх вэ?
        </h3>
      </Link>
    </div>
  );
}
