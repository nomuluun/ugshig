import Profile from "./svg/Profile";
import Gal from "./svg/Gal";
import Rank from "./svg/Rank";
import Home from "./svg/Home";
import { useRouter } from "next/router";
export default function Menu() {
  const router = useRouter();
  return (
    <div className="h-[] p-8 bg-[#F9BC60] w-[100%] flex justify-center items-center">
      <div className="h-[] max-w-[500px] w-[100%] flex flex-row justify-around items-end pb-[5px]">
        <button onClick={() => router.push("/")}>
          <Home />
        </button>
        <Gal />
        <button onClick={() => router.push("/scoreboard")}>
          <Rank />
        </button>
        <button onClick={() => router.push("/info")}>
          <Profile />
        </button>
      </div>
    </div>
  );
}
