import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import Menu from "./Menu";
import { useEffect, useState } from "react";

export default function Info() {
  const router = useRouter();
  const { user, userRank, setUser } = useUser();
  const [scoreBoard, setScoreBoard] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);
  const [rank, setRank] = useState();
  function logout() {
    router.push("/login");
    localStorage.removeItem("user");
    setUser(null);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setScoreBoard(result);
        let a = result?.sort((a, b) => {
          const aTotal = a?.score + a?.streak * 50;
          const bTotal = b?.score + b?.streak * 50;

          return bTotal - aTotal; // Sort in descending order (higher value first)
        });
        a.map((data, index) => {
          if (data.username === user.username) setRank(index + 1);
        });
        setTopPlayers(a);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);
  return (
    <div className="min-h-screen  bg-teal-900   text-white">
      <Menu />
      <div className="min-h-screen bg-[#0F3F3C] flex flex-col items-center text-white font-sans">
        <div className="mt-16 text-center">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-md text-gray-300">{user?.username}</p>
          <div className="">
            <span className="font-semibold ">Анги:</span>
            <span className="font-medium">{user?.class + user?.buleg}</span>
          </div>
        </div>

        <div className="bg-[#F2F0F4] text-black w-[90%] max-w-md mt-6 p-4 rounded-2xl shadow">
          <div className="flex justify-between py-1 border-b">
            <span className="font-semibold text-gray-600">
              {user?.task[0].name}
            </span>
            <span className="font-medium">
              {"Түвшин" + user?.task[0].lvl3 == true
                ? "III"
                : user?.task[0].lvl2 == true
                ? "II"
                : "I"}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b">
            <span className="font-semibold text-gray-600">
              {user?.task[1].name}
            </span>
            <span className="font-medium">
              {"Түвшин" + user?.task[1].lvl3 == true
                ? "III"
                : user?.task[1].lvl2 == true
                ? "II"
                : "I"}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b">
            <span className="font-semibold text-gray-600">
              {user?.task[2].name}
            </span>
            <span className="font-medium">
              {"Түвшин" + user?.task[2].lvl3 == true
                ? "III"
                : user?.task[2].lvl2 == true
                ? "II"
                : "I"}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b">
            <span className="font-semibold text-gray-600">
              {user?.task[3].name}
            </span>
            <span className="font-medium">
              {"Түвшин" + user?.task[3].lvl3 == true
                ? "III"
                : user?.task[3].lvl2 == true
                ? "II"
                : "I"}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b">
            <span className="font-semibold text-gray-600">
              {user?.task[4].name}
            </span>
            <span className="font-medium">
              {"Түвшин" + user?.task[4].lvl3 == true
                ? "III"
                : user?.task[4].lvl2 == true
                ? "II"
                : "I"}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-semibold text-gray-600">
              {user?.task[5].name}
            </span>
            <span className="font-medium">
              {"Түвшин" + user?.task[5].lvl3 == true
                ? "III"
                : user?.task[5].lvl2 == true
                ? "II"
                : "I"}
            </span>
          </div>
        </div>

        <div className="bg-[#F2F0F4] text-black w-[90%] max-w-md mt-4 p-4 rounded-2xl shadow flex justify-between text-center">
          <div className="w-1/3">
            <p className="text-xl font-bold">{user?.streak}</p>
            <p className="text-sm text-gray-600">Гал</p>
          </div>
          <div className="w-1/3 border-l border-r">
            <p className="text-xl font-bold">{rank == null ? "-" : rank}</p>
            <p className="text-sm text-gray-600">Байр</p>
          </div>
          <div className="w-1/3">
            <p className="text-xl font-bold">
              {user?.score + user?.streak * 50}
            </p>
            <p className="text-sm text-gray-600">Оноо</p>
          </div>
        </div>

        <div className="flex justify-center  items-center w-full max-w-md px-6 mt-12">
          <button
            onClick={logout}
            className="text-[black] py-2 px-4 rounded-[10px] bg-[#F4C577]  font-bold"
          >
            Системээс гарах
          </button>
        </div>
      </div>
    </div>
  );
}
