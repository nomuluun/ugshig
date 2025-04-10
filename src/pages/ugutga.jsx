import Path from "./components/Path";
import Menu from "./components/Menu";
import { useRouter } from "next/router";
export default function path() {
  const router = useRouter();
  return (
    <div className="min-h-[100vh] w-[100%] bg-[#004643] flex flex-col items-center gap-[8px]">
      <Menu />
      <h1 className="text-[#FFFFFF] font-black text-[24px] mt-[8px]">
        Үгийн утга
      </h1>
      <Path props={"ugHargalzuulah"} lvl={1} />
      <Path props={"heltsUg"} lvl={2} />
      <button
        onClick={() => router.push("/")}
        className="text-[#F2C26B] font-black text-15px px-6 py-2 hover:opacity-90"
      >
        <h1>← ГАРАХ</h1>
      </button>
    </div>
  );
}
