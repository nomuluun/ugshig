import { useEffect, useState } from "react";
import Menu from "./Menu";

export default function Scoreboard() {
  const [scoreBoard, setScoreBoard] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setScoreBoard(result);
        let a = result.sort((a, b) => {
          const aTotal = a.score + a.streak * 50;
          const bTotal = b.score + b.streak * 50;

          return bTotal - aTotal; // Sort in descending order (higher value first)
        });
        localStorage.setItem("rank", JSON.stringify(a));
        setTopPlayers(a);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-teal-900 flex flex-col items-center justify-center py-8 text-white">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-white">Уншиж байна...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }
  return (
    <div className="min-h-screen  bg-teal-900 flex flex-col items-center  text-white">
      <Menu />
      <div className="p-6  text-white  text-3xl font-bold text-center tracking-wide mb-6">
        Үгшигийн онооны самбар
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {topPlayers.slice(0, 3).map((player, index) => (
          <div
            key={player.place}
            className={`relative w-64 p-4 rounded-2xl shadow-lg transform transition-transform hover:scale-105 bg-gradient-to-b from-teal-700 to-teal-800 text-white`}
          >
            <div className="absolute top-2 right-2 text-yellow-400 text-4xl">
              {index === 0 && "🥇"}
              {index === 1 && "🥈"}
              {index === 2 && "🥉"}
            </div>
            <h3 className="text-xl font-bold mb-2">{player.name}</h3>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm">Гал: {player.streak}</p>
                <p className="text-sm">
                  Оноо: {player.score + player.streak * 100}
                </p>
              </div>
              <div>
                <p className="text-sm">
                  {"Анги:" + player.class + player.buleg}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl mt-8 overflow-x-auto">
        <div className="p-4 sm:p-6 rounded-2xl">
          <table className="min-w-full text-xs sm:text-sm text-left text-white">
            <thead className="text-[10px] sm:text-xs uppercase bg-teal-700 text-teal-200">
              <tr>
                <th scope="col" className="px-3 sm:px-6 py-3">
                  Байр
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3">
                  Нэр
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3">
                  Анги
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3">
                  Гал
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3">
                  Оноо
                </th>
              </tr>
            </thead>
            <tbody>
              {topPlayers.map((player, index) => {
                if (index > 2) {
                  return (
                    <tr
                      key={player.place}
                      className="border-b border-teal-700 hover:bg-teal-700/40 transition-all"
                    >
                      <td className="px-3 sm:px-6 py-3 font-semibold">
                        {index + 1}
                      </td>
                      <td className="px-3 sm:px-6 py-3">{player.name}</td>
                      <td className="px-3 sm:px-6 py-3">
                        {player.class + player.buleg}
                      </td>
                      <td className="px-3 sm:px-6 py-3">{player.streak}</td>
                      <td className="px-3 sm:px-6 py-3">
                        {player.score + player.streak * 50}
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
