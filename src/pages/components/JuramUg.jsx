import { useEffect, useState } from "react";
import { useJuramLevelContext } from "../context/JuramLevelContext";
import { useDataJuramContext } from "../context/data/DataJuramContext";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";

export default function JuramUg() {
  const { user, setUser } = useUser();
  const [score, setScore] = useState(0); // Score
  const [index, setIndex] = useState(0); // Index
  const [selectedIndex, setSelectedIndex] = useState(null); // Selected answer
  const [questions, setQuestions] = useState([]); // Questions
  const [showFinal, setShowFinal] = useState(false); // Final state
  const [userAnswers, setUserAnswers] = useState([]); // User answers
  const [timeLeft, setTimeLeft] = useState(10); // Timer
  const [isAnswerClickable, setIsAnswerClickable] = useState(true); // Answer clickable state
  const [next, setNext] = useState(false); // Next step state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const { juramround } = useJuramLevelContext();
  const { juramdata } = useDataJuramContext();

  useEffect(() => {
    const shuffledQuestions = [...juramdata]
      .sort(() => Math.random() - 0.5)
      .map((question) => ({
        ...question,
        result: [...question.result].sort(() => Math.random() - 0.5),
      }));

    setQuestions(shuffledQuestions);
  }, []);

  useEffect(() => {
    if (showFinal) {
      if (score == 5) {
        user.task[0][`lvl${juramround}`] = true;
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

  // Timer countdown
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

  // Handle answer submission
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
      setIsAnswerClickable(true);
      if (onoo == 0 && juramround === 3) setShowFinal(true);
      if (index >= 4) {
        setShowFinal(true);
      } else {
        setIndex(index + 1);
      }
    }, 1000);
  };

  // Format timer
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Go to the next question
  const resTime = (score, ind) => {
    setNext(true);
    handleSubmit(score, ind);
    setTimeLeft(0);
  };

  // Loading state conditionally renders before returning anything else
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#004643]">
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

  // Show final state if questions are finished
  if (!questions.length) return null;

  const progressPercent = (index / 5) * 100;
  return (
    <div className="min-h-screen bg-[#004643] flex flex-col items-center justify-center">
      {!showFinal ? (
        <div>
          <div className="flex flex-col p-4 text-white rounded-b-3xl text-center items-center justify-center">
            <div className="flex w-[280px] justify-between items-center text-[15px] font-black text-white">
              <span>ЖУРАМЛАСАН ҮГС</span>
              <span>ТҮВШИН {juramround}</span>
            </div>
            <div className="w-[280px] bg-[#ABD1C6] rounded-[15px] p-1 mb-4 overflow-hidden mt-[8px]">
              <div
                className="border border-[#ABD1C6] bg-[#004643] h-[16px] rounded-[15px] transition-all duration-1000 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            {index < 5 && juramround !== 1 && (
              <h2>Цаг: {formatTime(timeLeft)}</h2>
            )}
          </div>

          <div className="p-6 bg-[#004643] text-white flex flex-col gap-4">
            <h2 className="text-center font-bold text-lg">
              Зөв бичсэн үгийг олно уу.
            </h2>

            <div className="flex flex-col gap-3">
              {questions[index].result.map((data, ind) => {
                const isSelected = selectedIndex === ind;
                const isCorrect = data.score === 1;

                let buttonColor = "bg-[#ecf0f1] hover:[#bdc3c7]";
                if (selectedIndex !== null) {
                  if (isSelected && isCorrect) buttonColor = "bg-[#2ecc71]";
                  else if (isSelected && !isCorrect)
                    buttonColor = "bg-[#e74c3c]";
                }

                return (
                  <button
                    key={ind}
                    onClick={() => resTime(data.score, ind)}
                    className={`py-3 px-4 bg-[#fff] rounded-xl font-semibold text-black transition-colors ${buttonColor}`}
                    disabled={!isAnswerClickable} // Disable button when timer runs out
                  >
                    {data.result}
                  </button>
                );
              })}
            </div>

            <p className="text-sm text-center mt-2 text-gray-200">
              Үгийн тайлбар: {questions[index].tailbar}
            </p>

            <button
              onClick={() => router.push("/zuvbichig")}
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

              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-[#ABD1C6] rounded-lg overflow-hidden min-w-[600px]">
                  <thead className="bg-[#256353]">
                    <tr>
                      <th className="py-2 px-4 border-b border-[#ABD1C6] text-sm md:text-base">
                        Тайлбар
                      </th>
                      <th className="py-2 px-4 border-b border-[#ABD1C6] text-sm md:text-base">
                        Таны сонгосон
                      </th>
                      <th className="py-2 px-4 border-b border-[#ABD1C6] text-sm md:text-base">
                        Зөв үг
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAnswers
                      .filter(
                        (ans) => ans.selected.result !== ans.correct.result
                      )
                      .map((ans, idx) => (
                        <tr
                          key={idx}
                          className="bg-[#12352f] hover:bg-[#17493f] transition-colors"
                        >
                          <td className="py-2 px-4 border-b border-[#ABD1C6] text-xs md:text-sm">
                            {ans.question.tailbar}
                          </td>
                          <td className="py-2 px-4 border-b border-[#ABD1C6] text-red-400 font-semibold text-xs md:text-sm">
                            {ans.selected.result == -1
                              ? "Songoogui"
                              : ans.selected.result}
                          </td>
                          <td className="py-2 px-4 border-b border-[#ABD1C6] text-green-400 font-semibold text-xs md:text-sm">
                            {ans.correct.result}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div className="flex justify-between">
            <div></div>
            <button
              onClick={() => router.push("/zuvbichig")}
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
