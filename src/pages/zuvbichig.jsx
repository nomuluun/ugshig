import Path from "./components/Path";
import Menu from "./components/Menu";
import { useRouter } from "next/router";
import { useUser } from "./context/UserContext";
import { useEffect, useState } from "react";
export default function path() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user]);
  if (loading) {
    return (
      <div className="flex items-center bg-teal-900 justify-center h-screen">
        <div className="text-xl font-semibold animate-pulse text-gray-500">
          Ачаалж байна...
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-[100vh] w-[100%] bg-[#004643] flex flex-col items-center gap-[8px]">
      <Menu />
      <h1 className="text-[#FFFFFF] font-black text-[24px] mt-[8px]">
        ЗӨВ БИЧИГ
      </h1>
      <Path props={"juramUg"} lvl={1} />
      <Path props={"aldaaUg"} lvl={2} />
      <button
        onClick={() => router.push("/")}
        className="text-[#F2C26B] font-black text-15px px-6 py-2 pb-10 hover:opacity-90"
      >
        <h1>← Буцах</h1>
      </button>
    </div>
  );
}
