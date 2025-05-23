import { useUser } from "../context/UserContext";
import Menu from "./Menu";
import ModuleDurem from "./ModuleDurem";
import ModuleUtga from "./ModuleUtga";
import ModuleZuv from "./ModuleZuv";
import UgshigIcon from "./svg/UgshigIcon";
export default function Dashboard() {
  const { user } = useUser();
  console.log(user);
  return (
    <div className=" w-[100%] bg-[#004643] min-h-screen flex flex-col items-center just">
      <Menu />
      <div className=" min-h-[300px] w-[100%] max-w-[500px] flex flex-col items-center justify-center gap-[20px]">
        <h1 className="text-[#FFFFFF] font-black text-[20px] w-[70%] text-center">
          Өнөөдрийн "ҮГШИГ"-ээ таагаагүй юм биш биз?
        </h1>
        <UgshigIcon />
      </div>
      <div className=" py-5  flex flex-col gap-[20px] items-center   ">
        <h1 className="text-[#FFFFFF] font-black text-[20px] w-[70%] text-center">
          Өнөөдрийн галаа асаагаагүй юм биш биз?
        </h1>
        <div className=" flex flex-wrap   items-center gap-[10px]   justify-center">
          <ModuleZuv />
          <ModuleDurem />
          <ModuleUtga />
        </div>
      </div>
    </div>
  );
}
