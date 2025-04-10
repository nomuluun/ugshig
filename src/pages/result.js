import { useScoreContext } from "./context/ScoreContext";
import Back from "./components/svg/Back";
import Retry from "./components/svg/Retry";
import { useUser } from "./context/UserContext";
import { useEffect, useState } from "react";
import { useLevelContext } from "./context/LevelContext";
import { useRouter } from "next/router";
export default function Home() {
  const { round, setRound } = useLevelContext();
  const { user, setUser } = useUser();
  const { onoo, resultQ, level, percent } = useScoreContext();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  console.log("userResult=", user);
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
  // useEffect(() => {
  //   if (user == null) {
  //     router.push("/");
  //   }
  // }, [user]);
  useEffect(() => {
    if (user != null) {
      let updatedUser = user;
      if (onoo === percent) {
        if (round === 1) {
          updatedUser.task[1].lvl1 = true;
        }
        if (round === 2) {
          updatedUser.task[1].lvl2 = true;
        }
        if (round === 3) {
          updatedUser.task[1].lvl3 = true;
        }
      }

      updatedUser.score = updatedUser.score + onoo * 8 * round; // Update the score

      setIsLoading(true); // Show loading indicator before making the request

      fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: updatedUser._id,
          score: updatedUser.score,
          task: updatedUser.task,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update user score");
          }
          return response.json();
        })
        .then((data) => {
          console.log("User updated:", updatedUser);
          setUser(updatedUser); // Update the user state
          localStorage.setItem("user", JSON.stringify(updatedUser)); // Store updated user in localStorage
        })
        .catch((error) => {
          console.error("Error updating user:", error.message); // Log the error message
        })
        .finally(() => {
          setIsLoading(false); // Hide loading indicator once the request is completed
        });
    }
  }, [user]); // Added dependencies to re-run the effect when these values change

  const percentage =
    (onoo * 100) / percent === 100 ? 99.99 : (onoo * 100) / percent;
  console.log(percent);
  const r = 16;
  const cx = 16;
  const cy = 16;
  const angle = (percentage / 100) * 2 * Math.PI;
  const x = cx + r * Math.sin(angle);
  const y = cy - r * Math.cos(angle);
  const largeArc = percentage > 50 ? 1 : 0;
  const pathData = `
  M${cx} ${cy}
  L${cx} 0
  A${r} ${r} 0 ${largeArc} 1 ${x} ${y}
  Z
`;
  useEffect(() => {
    // onoo = onoo * 8 * round;
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#194b44]">
        <div className="text-center text-white">
          <p className="text-lg font-semibold">Уншиж байна...</p>
          <div className="mt-4 flex justify-center items-center">
            {/* Loading spinner */}
            <div className="w-16 h-16 border-4 border-t-4 border-[#f3bf66] border-solid rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-[30px] flex flex-col justify-start items-center bg-[#004643] min-h-[100vh] text-[#fff]">
      <div>
        <div className="flex flex-col items-center">
          <h1 className="text-[#fff] text-[30px] font-black text-center">{`АЛДААТАЙ ҮГС`}</h1>

          <h1 className="text-[#fff] text-[18px] font-black mt-2">
            {`ТҮВШИН ` + level}
          </h1>

          <div className="flex justify-center items-center w-[200px] h-[200px] border-4 border-[#F9BC60] rounded-full mt-6">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <circle r="16" cx="16" cy="16" fill="#004643" />
              <path d={pathData} fill="#F9BC60" />
            </svg>
          </div>

          <div className="flex flex-col items-center my-2">
            <h1 className="text-[#F9BC60] text-[36px] font-bold">
              {"+" + onoo * 8 * round}
            </h1>
          </div>
          <h1 className="text-[#fff]  text-[23px] font-black">
            ТАНЫ ОЛООГҮЙ ҮГС:{" "}
          </h1>
        </div>
        <div>
          <table className="text-lg text-[#004643] border-collapse border bg-[#E8E4E6] border-gray-400 rounded-xl">
            <thead>
              <tr>
                <th className="border border-gray-300 py-2 px-4">ТАШААРСАН</th>
                <th className="border border-gray-300 py-2 px-4">ЗАЛРУУЛСАН</th>
              </tr>
            </thead>
            <tbody>
              {resultQ.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-gray-300 py-2 px-4">
                      {data.incorrect}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {data.correct}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-row justify-between items-center px-4  mt-6">
            <Retry />
            <Back />
          </div>
        </div>
      </div>
    </div>
  );
}
