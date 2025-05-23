import Link from "next/link";
export default function ModuleZuv() {
  return (
    <div className="w-[100%] max-w-[450px] border bg-[#F9BC60] p-10 rounded-[30px] flex flex-col justify-around gap-[20px] pl-[20px] shadow-2xl">
      <Link href="./zuvbichig">
        <h1 className="text-[#004643] font-black text-[20px]">ЗӨВ БИЧИГ</h1>
        <h3 className="text-[#FFFFFF] font-black text-[15px] pt-[10px] ">
          Зөв бичиж чадах уу?
        </h3>
      </Link>
    </div>
  );
}
