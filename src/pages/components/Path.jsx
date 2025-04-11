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
  const [lvlcheck, setLvlcheck] = useState(null);
  const router = useRouter();
  console.log("task=", task);
  console.log("pops=", props);
  useEffect(() => {
    console.log("usa=", user);
    let a = user?.task.filter((data) => data.id == props);
    console.log("user=", a);
    a != null ? setTask(...a) : setTask(null);
  }, [user]);
  const [showMessage, setShowMessage] = useState(false);

  function handleTask(ind) {
    // console.log("task=", task);
    if (task.id == "aldaaUg") {
      if (ind == 1 || (ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        setCategory("aldaaUg");
        setRound(ind);
        setLvlcheck(null);
        router.push("/uguulber");
      } else {
        setShowMessage(true); // Мессэжийг харуулах
        setLvlcheck("Өмнөх үеийг давна уу.");

        setTimeout(() => {
          setShowMessage(false); // 2 секундийн дараа алга болгоно
        }, 1000);
      }
    }
    if (task.id == "juramUg") {
      if (ind == 1 || (ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        setCategory("juramUg");
        setJuramRound(ind);
        setLvlcheck(null);
        router.push("/juram");
      } else {
        setShowMessage(true); // Мессэжийг харуулах
        setLvlcheck("Өмнөх үеийг давна уу.");

        setTimeout(() => {
          setShowMessage(false); // 2 секундийн дараа алга болгоно
        }, 1000);
      }
    }
    if (task.id == "ugHargalzuulah") {
      if (ind == 1 || (ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        setCategory("ugHargalzuulah");
        setLvlcheck(null);
        // alert("hi");
        setTailbarRound(ind);
        router.push("/tailbarug");
      } else {
        setLvlcheck("Өмнөх үеийг давна уу.");
        setShowMessage(true); // Мессэжийг харуулах

        setTimeout(() => {
          setShowMessage(false); // 2 секундийн дараа алга болгоно
        }, 1000);
      }
    }
    if (task.id == "heltsUg") {
      if (ind == 1 || (ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        // alert("hi");
        setLvlcheck(null);
        setCategory("heltsUg");
        setKheltsRound(ind);
        router.push("/heltsug");
      } else {
        setLvlcheck("Өмнөх үеийг давна уу.");
        setShowMessage(true); // Мессэжийг харуулах

        setTimeout(() => {
          setShowMessage(false); // 2 секундийн дараа алга болгоно
        }, 1000);
      }
    }
    if (task.id == "zuvUg") {
      if (ind == 1 || (ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        setCategory("heltsUg");
        setLvlcheck(null);
        // alert("hi");
        setJuramRound(ind);
        router.push("/zuvug");
      } else {
        setLvlcheck("Өмнөх үеийг давна уу.");
        setShowMessage(true); // Мессэжийг харуулах

        setTimeout(() => {
          setShowMessage(false); // 2 секундийн дараа алга болгоно
        }, 1000);
      }
    }
    if (task.id == "duremNuhuh") {
      if (ind == 1 || (ind == 2 && task.lvl1) || (ind == 3 && task.lvl2)) {
        setCategory("duremNuhuh");
        setLvlcheck(null);
        // alert("hi");
        setKheltsRound(ind);
        router.push("/duremnuhuh");
      } else {
        setLvlcheck("Өмнөх үеийг давна уу.");
        setShowMessage(true); // Мессэжийг харуулах

        setTimeout(() => {
          setShowMessage(false); // 2 секундийн дараа алга болгоно
        }, 2000);
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
        {showMessage && lvlcheck != null && (
          <p className="text-white mt-2 transition-opacity duration-300">
            {lvlcheck}
          </p>
        )}
      </div>
    </div>
  );
}
