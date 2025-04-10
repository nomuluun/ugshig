import { useEffect, useState } from "react";
import { useJuramLevelContext } from "../context/JuramLevelContext";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";
import { useDataDuremUgContext } from "../context/data/DataDuremUg";
import Menu from "./Menu";

export default function Zuvug() {
  const { user, setUser } = useUser();
  const [score, setScore] = useState(0); //onoo
  const [index, setIndex] = useState(0); //index
  const [selectedIndex, setSelectedIndex] = useState(null); //songosn hariult
  const [questions, setQuestions] = useState([]); //asuultuud/ugs
  const [showFinal, setShowFinal] = useState(false); //nuhtsul
  const [userAnswers, setUserAnswers] = useState([]); //useriin songosn hariultuud
  const [timeLeft, setTimeLeft] = useState(10); //hugatsaa
  const [isAnswerClickable, setIsAnswerClickable] = useState(true);
  const [next, setNext] = useState(false); //nuhtsul
  const router = useRouter();
  const { juramround } = useJuramLevelContext();
  const { duremUgdata } = useDataDuremUgContext();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  //console.log("juram user ", user);
  useEffect(() => {
    if (showFinal) {
      if (score == 5) {
        user.task[4][`lvl${juramround}`] = true;
      }
      if (juramround === 3 && score < 5) return;
      user.score = user.score + score * juramround * 12;

      setIsLoading(true); // Show loading indicator before making the request

      fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user._id,
          score: user.score,
          task: user.task,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update user score");
          }
          return response.json();
        })
        .then((data) => {
          console.log("updateUser=", user);
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        })
        .finally(() => {
          setIsLoading(false); // Hide loading indicator once the request is completed
        });
    }
  }, [showFinal]);

  useEffect(() => {
    const shuffledQuestions = [...duremUgdata]
      .sort(() => Math.random() - 0.5)
      .map((question) => ({
        ...question,
        result: [...question.result].sort(() => Math.random() - 0.5),
      }));

    setQuestions(shuffledQuestions);
  }, []);
  // shuffle of question and choice

  const handleSubmit = (onoo, ind) => {
    if (selectedIndex !== null || !isAnswerClickable) return; // Prevent clicking after time runs out or already selected

    setSelectedIndex(ind);
    setScore(score + onoo);

    const correctAnswer = questions[index].result.find(
      (item) => item.score === 1
    );
    let sel = -1;
    if (ind !== -1) {
      sel = questions[index].result[ind];
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[index],
        selected: sel,
        correct: correctAnswer,
      },
    ]);

    setTimeout(() => {
      setSelectedIndex(null);
      setTimeLeft(10);
      setNext(false);
      setIsAnswerClickable(true);
      if (onoo == 0 && juramround === 3) setShowFinal(1);
      if (index >= 4) {
        setShowFinal(true);
      } else {
        setIndex(index + 1);
      }
    }, 1000);
  };
  // Check answers

  useEffect(() => {
    if (showFinal || juramround === 1 || next === 1) return;
    if (timeLeft <= 0) {
      handleSubmit(0, -1);
      setIsAnswerClickable(false);
      return;
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
  // countdown timer

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };
  // format time

  const resTime = (score, ind) => {
    setNext(true);
    handleSubmit(score, ind);
    setTimeLeft(0);
  };
  // next sub
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
  if (!questions.length) return null;

  const progressPercent = (index / 5) * 100;

  return (
    <div className="min-h-screen bg-[#194b44] flex flex-col items-center justify-center ">
      <Menu />
      {!showFinal ? (
        <div>
          <div className="flex flex-col p-4 text-white rounded-b-3xl text-center items-center justify-center">
            <div className="flex w-[280px] justify-between items-center text-[15px] font-black text-white">
              <span>ДҮРМИЙН ҮГС</span>
              <span>ТҮВШИН {juramround}</span>
            </div>
            <div className="w-[280px] bg-[#ABD1C6] rounded-[15px] h-[16px] mb-4 overflow-hidden mt-[8px]">
              <div
                className="border border-[#ABD1C6] bg-[#004643] h-[16px] rounded-[15px] transition-all duration-1000 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            {index < 5 && juramround !== 1 && (
              <h2>Цаг: {formatTime(timeLeft)}</h2>
            )}
          </div>

          <div className="p-6 bg-[#194b44] text-white flex flex-col gap-4">
            <h2 className="text-center font-bold text-lg">
              Зөв бичсэн үгийг олно уу.
            </h2>

            <div className="flex flex-col gap-3">
              {questions[index].result.map((data, ind) => {
                const isSelected = selectedIndex === ind;
                const isCorrect = data.score === 1;

                let buttonColor = "bg-gray-200 hover:bg-gray-300";
                if (selectedIndex !== null) {
                  if (isSelected && isCorrect) buttonColor = "bg-green-400";
                  else if (isSelected && !isCorrect) buttonColor = "bg-red-400";
                }

                return (
                  <button
                    key={ind}
                    onClick={() => resTime(data.score, ind)}
                    className={`py-3 px-4 rounded-xl font-semibold text-black transition-colors ${buttonColor}`}
                    disabled={!isAnswerClickable} // Disable button when timer runs out
                  >
                    {data.result}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => router.push("/durem")}
              className="mt-4 text-[#f3bf66] text-sm font-bold self-start"
            >
              ← ГАРАХ
            </button>
          </div>
        </div>
      ) : (
        <div className="text-white p-6 w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4 text-center">
            Таны оноо: {score * juramround}/{5 * juramround}
          </h2>

          {userAnswers.filter(
            (ans) => ans.selected.result !== ans.correct.result
          ).length === 0 ? (
            <p className="mt-4 text-center text-green-400 font-medium">
              Та бүх үгсийг зөв сонгосон байна. Сайн байна!
            </p>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-2">
                Буруу сонгосон үгс:
              </h3>

              <table className="w-full text-left border border-[#ABD1C6] rounded-lg overflow-hidden">
                <thead className="bg-[#256353]">
                  <tr>
                    <th className="py-2 px-4 border-b border-[#ABD1C6]">
                      Таны сонгосон
                    </th>
                    <th className="py-2 px-4 border-b border-[#ABD1C6]">
                      Зөв үг
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userAnswers
                    .filter((ans) => ans.selected.result !== ans.correct.result)
                    .map((ans, idx) => (
                      <tr key={idx} className="bg-[#12352f] hover:bg-[#17493f]">
                        <td className="py-2 px-4 border-b border-[#ABD1C6] text-red-400 font-semibold">
                          {ans.selected.result == -1
                            ? "Songoogui"
                            : ans.selected.result}
                        </td>
                        <td className="py-2 px-4 border-b border-[#ABD1C6] text-green-400 font-semibold">
                          {ans.correct.result}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
          <div className="flex justify-between">
            <div></div>
            <button
              onClick={() => router.push("/durem")}
              className="mt-4 text-[#f3bf66] text-sm font-bold self-start"
            >
              ← ГАРАХ
            </button>
          </div>
        </div>
      )}
    </div>
  );
  //HTML code
}
