import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useScoreContext } from "../context/ScoreContext";
import { useLevelContext } from "../context/LevelContext";
import { useAldaataiUgContext } from "../context/AldaataiUgContext";
import { useUser } from "../context/UserContext";
import Menu from "./Menu";
export default function Uguulber() {
  const { asuult } = useAldaataiUgContext();
  const { user, setUser } = useUser();
  let b = asuult;
  let a;
  const { round, setRound } = useLevelContext();
  console.log("userUguulber", user);
  const {
    onoo,
    setOnoo,
    resultQ,
    setResultQ,
    level,
    setLevel,
    percent,
    setpercent,
  } = useScoreContext();
  const [q_score, setQ_Score] = useState(0);
  const [data, setData] = useState(b);
  const [index, setIndex] = useState(0);
  const [qnum, setQnum] = useState(2);
  const [timeLeft, setTimeLeft] = useState(80);
  const router = useRouter();
  const [poscore, setPoscore] = useState(0);
  useEffect(() => {
    a = Math.floor(Math.random() * b.length);
    setpercent(data[a].result.length);
    setOnoo(0);
    setResultQ([]);
    setIndex(a);
  }, []);
  function backPage() {
    a = Math.floor(Math.random() * b.length);
    setpercent(data[a].result.length);
    setOnoo(0);
    setResultQ([]);
    setIndex(a);
    router.push("/");
  }
  const progressPercent = ((2 - qnum) / 3) * 100;
  useEffect(() => {
    if (round === 1) return;
    if (timeLeft === 0) {
      if (round === 3) {
        setOnoo(0);
        let sum = user.score + onoo;
        setUser({ ...user, score: sum });
        router.push("/result");
      } else {
        handleSubmit(null);
      }
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };
  function nextQ() {
    setQ_Score(0);
    let N = data[index].result.length;
    setPoscore(poscore + N);
    setpercent(percent + N);
    data.splice(index, 1);
    if (0 === data.length) {
      alert("Duusvaa");
    } else {
      let M = data.length;
      let random = Math.floor(Math.random() * M);
      if (data.length == random) setIndex(random);
      else setIndex(random);
    }
  }
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setTimeLeft(3);
    let mp = new Map();
    let N = data[index].result.length;
    setQnum(qnum - 1);
    for (let i = 0; i < N; i++) mp.set(i, 0);
    for (let i = 0; i < N; i++) {
      let in1 = e ? e.target[`input${i}`].value : "";
      for (let j = 0; j < N; j++) {
        if (in1 === data[index].result[j].correct) {
          mp.set(j, Math.max(mp.get(j), 1));
        }
      }
    }
    let score1 = 0;
    for (let i = 0; i < N; i++) {
      score1 = score1 + mp.get(i);
    }
    for (let i = 0; i < N; i++) {
      if (mp.get(i) === 0) {
        resultQ.push(data[index].result[i]);
      }
    }
    setOnoo(onoo + score1);
    setLevel(round);
    for (let i = 0; i < N; i++) {
      if (e) e.target[`input${i}`].value = "";
    }
    if (round === 3 && score1 !== N) {
      let sum = user.score + onoo;
      setUser({ ...user, score: sum });
      router.push("/result");
      return;
    }
    if (qnum === 0) {
      let sum = user.score + onoo;
      setUser({ ...user, score: sum });
      router.push("/result");
      return;
    }
    nextQ();
  };

  return (
    <div className="p-[20px] flex flex-col justify-center items-center  bg-[#004643] min-h-[100vh] text-[#fff]">
      <div className="max-w-[600px] w-full">
        <div className="flex justify-between py-5">
          <h1 className="text-[23px] font-black">АЛДААТАЙ ҮГС</h1>
          <h1 className="text-[23px] font-black">{`ТҮВШИН : ${round}`}</h1>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="w-[560px] bg-[#ABD1C6] rounded-[15px] p-2 mb-4 overflow-hidden mt-[8px]">
            <div
              className="border border-[#ABD1C6] bg-[#004643] h-[16px] rounded-[15px] transition-all duration-1000 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <h1 className="text-[23px] font-black mb-4">{`Доорх өгүүлбэрээс алдаатай ${data[index].result.length} үгийг олно уу`}</h1>

        {round !== 1 && <h1>{formatTime(timeLeft)}</h1>}

        <h1 className="text-xl bg-[#F9BC60] p-5 rounded-[20px] my-4 text-[#333] mx-auto text-center">
          {data[index].question}
        </h1>

        {timeLeft >= 0 && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center"
          >
            {data[index].result.map((data, ind) => (
              <div
                className="flex items-center flex-wrap w-full justify-center gap-4"
                key={ind}
              >
                <h2 className="text-xl font-medium">{`Хариулт ${ind + 1}:`}</h2>
                <input
                  type="text"
                  name={`input${ind}`}
                  id={`input${ind}`}
                  className="border bg-[#fff] text-black w-[50%] rounded-[10px] p-2"
                />
              </div>
            ))}
            <div className="flex justify-between w-full ">
              <button
                className="text-xl bg-[#F9BC60] py-2 px-4 rounded-[20px] my-4 text-[#333] cursor-pointer  block"
                onClick={backPage}
              >
                Гарах
              </button>
              <input
                className="text-xl bg-[#F9BC60] py-2 px-4 rounded-[20px] my-4 text-[#333] cursor-pointer  block"
                type="submit"
                value="Дараах"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
