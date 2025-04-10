import { useRouter } from "next/router";
import { useJuramLevelContext } from "../context/JuramLevelContext";
export default function JuramLevelSongolt() {
  const { juramround, setJuramRound } = useJuramLevelContext();
  const router = useRouter();
  function handleLevelClick(level) {
    setJuramRound(level);
    router.push("components/JuramUg");
  }
  return (
    <div className="p-[20px] flex flex-col justify-center items-center bg-[#004643] h-[100vh] text-[#fff]">
      <h1>JURAM</h1>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleLevelClick(1)}
        >
          Level 1
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleLevelClick(2)}
        >
          Level 2
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleLevelClick(3)}
        >
          Level 3
        </button>
      </div>
    </div>
  );
}
