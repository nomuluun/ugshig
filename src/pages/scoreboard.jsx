import { useEffect, useState } from "react";
import { useUser } from "./context/UserContext";
import Menu from "./components/Menu";

export default function Home() {
  const [scoreBoard, setScoreBoard] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);

  const otherPlayers = [
    { place: 4, name: "Нэр Овог", fire: 5, score: 1970 },
    { place: 5, name: "Нэр Овог", fire: 5, score: 1970 },
    { place: 6, name: "Нэр Овог", fire: 5, score: 1970 },
    { place: 7, name: "Нэр Овог", fire: 5, score: 1970 },
    { place: 8, name: "Нэр Овог", fire: 5, score: 1970 },
    { place: 9, name: "Нэр Овог", fire: 5, score: 1970 },
    { place: 10, name: "Нэр Овог", fire: 5, score: 1970 },
  ];

  const currentUser = { place: 56, name: "Нэр Овог", fire: 5, score: 1970 };
  console.log(scoreBoard);
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
          const aTotal = a.score + a.streak * 100;
          const bTotal = b.score + b.streak * 100;

          return bTotal - aTotal; // Sort in descending order (higher value first)
        });

        setTopPlayers(a);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const getTextColor = (place) => {
    if (place === 1) return "red";
    if (place === 2) return "red";
    return "red";
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-teal-900 flex flex-col items-center py-8 text-white">
        <span className="loading loading-spinner text-primary"></span>
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
            <p className="text-sm">Гал: {player.streak}</p>
            <p className="text-sm">
              Оноо: {player.score + player.streak * 100}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl mt-8">
        <div className="p-6 rounded-2xl ">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-xs uppercase bg-teal-700 text-teal-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Байр
                </th>
                <th scope="col" className="px-6 py-3">
                  Нэр
                </th>
                <th scope="col" className="px-6 py-3">
                  Гал
                </th>
                <th scope="col" className="px-6 py-3">
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
                      <td className="px-6 py-3 font-semibold">{index + 1}</td>
                      <td className="px-6 py-3">{player.name}</td>
                      <td className="px-6 py-3">{player.streak}</td>
                      <td className="px-6 py-3">
                        {player.score + player.streak * 100}
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
