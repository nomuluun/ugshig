import Star from "./svg/Star";
import Completed from "./svg/Completed";
import Locked from "./svg/Locked";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { ST } from "next/dist/shared/lib/utils";
import { useLevelContext } from "../context/LevelContext";
import { useRouter } from "next/router";
import { useJuramLevelContext } from "../context/JuramLevelContext";
import { useTailbarLevelContext } from "../context/TailbarLevelContext";
import { useKheltsLevelContext } from "../context/KheltsLevelContext";
import { useScoreContext } from "../context/ScoreContext";
export default function Path({ props, lvl }) {
  const { user } = useUser();
  const { setRound } = useLevelContext();
  const [task, setTask] = useState();
  const { setJuramRound } = useJuramLevelContext();
  const { setTailbarRound } = useTailbarLevelContext(); //tvshin
  const { setKheltsRound } = useKheltsLevelContext();
  const { category, setCategory } = useScoreContext();

  const router = useRouter();
  console.log("task=", task);
  console.log("pops=", props);
  useEffect(() => {
    console.log("usa=", user);
    let a = user?.task.filter((data) => data.id == props);
    console.log("user=", a);
    a != null ? setTask(...a) : setTask(null);
  }, [user]);
  function handleTask(ind) {
    // console.log("task=", task);
    if (task.id == "aldaaUg") {
      if ((ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        setCategory("aldaaUg");
        setRound(ind);
        router.push("/uguulber");
      } else {
        alert("Та өмнөх үеийг давна уу");
      }
    }
    if (task.id == "juramUg") {
      if ((ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        setCategory("juramUg");
        setJuramRound(ind);
        router.push("/juram");
      } else {
        alert("Та өмнөх үеийг давна уу");
      }
    }
    if (task.id == "ugHargalzuulah") {
      if ((ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        setCategory("ugHargalzuulah");
        // alert("hi");
        setTailbarRound(ind);
        router.push("/tailbarug");
      } else {
        alert("Та өмнөх үеийг давна уу");
      }
    }
    if (task.id == "heltsUg") {
      if ((ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        // alert("hi");
        setCategory("heltsUg");
        setKheltsRound(ind);
        router.push("/heltsug");
      } else {
        alert("Та өмнөх үеийг давна уу");
      }
    }
    if (task.id == "zuvUg") {
      if ((ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        setCategory("heltsUg");
        // alert("hi");
        setJuramRound(ind);
        router.push("/zuvug");
      } else {
        alert("Та өмнөх үеийг давна уу");
      }
    }
    if (task.id == "duremNuhuh") {
      if ((ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        setCategory("duremNuhuh");
        // alert("hi");
        setKheltsRound(ind);
        router.push("/duremnuhuh");
      } else {
        alert("Та өмнөх үеийг давна уу");
      }
    }
    // if (task.id == "")
  }
  return (
    <div className="py-2 gap-4   w-[100%] bg-[#004643] flex flex-col items-center justify-around">
      <div className="bg-[#F9BC60] py-5 w-[80%] max-w-[500px] border-[3px] border-[#C37F18] rounded-[15px] flex flex-col justify-center gap-[5px] pl-[30px]">
        <h3 className="font-black text-[#FFFFFF] text-[15px]">
          {"Түвшин " + lvl}
        </h3>
        <h1 className="font-black text-[#004643] text-[20px]">{task?.name}</h1>
      </div>
      <div className="py-4  w-[80%] flex flex-col justify-around items-center">
        <div className=" relative left-[-100px]">
          <button onClick={() => handleTask(1)}>
            {task?.lvl1 ? <Completed /> : <Star />}
          </button>
        </div>
        <div className=" relative">
          <button onClick={() => handleTask(2)}>
            {task?.lvl2 ? <Completed /> : task?.lvl1 ? <Star /> : <Locked />}
          </button>
        </div>
        <div className=" relative left-[100px]">
          <button onClick={() => handleTask(3)}>
            {task?.lvl3 ? <Completed /> : task?.lvl2 ? <Star /> : <Locked />}
          </button>
        </div>
      </div>
    </div>
  );
}
