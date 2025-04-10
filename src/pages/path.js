import Path from "./components/Path";
import Menu from "./components/Menu";
export default function path() {
  return (
    <div className="min-h-[100vh] w-[100%] bg-[#004643] flex flex-col items-center gap-[8px]">
      <Menu />
      <h1 className="text-[#FFFFFF] font-black text-[24px] mt-[8px]">
        ЗӨВ БИЧИГ
      </h1>
      <Path />
      <Path />
    </div>
  );
}
