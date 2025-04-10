import { useEffect, useState } from "react";
import { useWordleUgContext } from "../context/WordleUgContext";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import Menu from "./Menu";

const TryNum = 6;
export default function WordleClone() {
  const { user, setUser } = useUser();

  const { asuult } = useWordleUgContext();
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [finished, setFinished] = useState(false);
  const [lost, setLost] = useState(false);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Randomly set the word from the 'asuult' list when the component mounts
  useEffect(() => {
    if (asuult.length > 0) {
      const randomIndex = Math.floor(Math.random() * asuult.length);
      setIndex(randomIndex);
    }
  }, [asuult]);

  // Get the word and definition for the current game
  const wordl = asuult[index]?.word?.toUpperCase() || "";
  const def = asuult[index]?.definition || "";
  const Wlength = wordl.length;
  const formattedDef = def.charAt(0).toUpperCase() + def.slice(1);
  const handleChange = (e) => {
    if (finished) return;
    const val = e.target.value.toUpperCase();
    if (val.length <= Wlength) {
      setInput(val);
    }
  };
  const router = useRouter();
  const handleEnter = () => {
    if (input.length !== Wlength || finished) return;
    const newGuesses = [...guesses, input];
    setGuesses(newGuesses);
    setInput("");

    if (input === wordl) {
      setFinished(true);
      user.streak = user.streak + 1;
      setIsLoading(true); // Show loading indicator before making the request

      fetch("/api/streak", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user._id,
          streak: user.streak,
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
    } else if (newGuesses.length >= TryNum) {
      user.streak = 0;
      setIsLoading(true); // Show loading indicator before making the request

      fetch("/api/streak", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user._id,
          streak: user.streak,
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
      setFinished(true);
      setLost(true);
    }
  };

  // Function to reset the game and choose a new word
  const closeModal = () => {
    setFinished(false);
    setLost(false);
    setGuesses([]);
    setInput("");
    // Optionally re-randomize word
    const newRandomIndex = Math.floor(Math.random() * asuult.length);
    setIndex(newRandomIndex);
    router.back();
  };

  // Function to return to the start of the game (exit current game)
  const returnToStart = () => {
    setFinished(false);
    setLost(false);
    setGuesses([]);
    setInput("");
    const newRandomIndex = Math.floor(Math.random() * asuult.length);
    setIndex(newRandomIndex);
  };
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
    <div className="flex flex-col justify-center items-center bg-[#004643] h-[100vh] ">
      <div className="fixed top-0 w-full">
        <Menu />
      </div>
      <h1 className="text-white font-extrabold text-4xl mb-10">ҮГШИГ</h1>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleEnter()}
        className="border-2 border-white p-2 text-center text-lg rounded-2xl bg-white font-extrabold"
        disabled={finished}
        maxLength={Wlength}
        placeholder="Үг оруулна уу"
      />

      <div className="space-y-2 mt-4">
        {Array.from({ length: TryNum }).map((_, rowIndex) => {
          const guess = guesses[rowIndex] || "";
          return (
            <div key={rowIndex} className="flex space-x-1">
              {Array.from({ length: Wlength }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-10 h-10 md:w-16 md:h-16 flex items-center justify-center text-2xl font-extrabold rounded-md ${
                    guess[colIndex] === wordl[colIndex]
                      ? "bg-[#6CA872] text-white"
                      : wordl.includes(guess[colIndex])
                      ? "bg-[#F9BC60] text-white"
                      : "bg-[#BDBDBD] text-white"
                  }`}
                >
                  {guess[colIndex] || ""}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {finished && !lost && (
        <div>
          <h1 className="text-white flex items-center justify-center font-extrabold text-3xl mb-5 mt-5">
            Үгийн тайлбар
          </h1>
          <p className="text-white flex items-center justify-center text-2xl mb-10">
            {formattedDef}
          </p>
        </div>
      )}
      <div className="flex mt-10 justify-between items-center w-[320px]">
        <button
          onClick={closeModal}
          className="text-white bg-[#004643] p-2 rounded-md font-extrabold"
        >
          Гарах
        </button>
        {!finished && (
          <button
            onClick={handleEnter}
            className="bg-[#F9BC60] text-black p-2 rounded-md disabled:bg-[#F9BC60]/40 font-extrabold"
            disabled={finished}
          >
            Шалгах
          </button>
        )}
      </div>
      {finished && lost && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="absolute w-full h-[100vh] top-0 z-[-1] bg-black opacity-70"></div>
          <div className="bg-[#F9BC60] p-6 rounded-xl max-w-md w-full text-center opacity-100">
            <h2 className="text-[#004643] text-3xl font-extrabold mb-4">
              Өнөөдрийн үг:
            </h2>
            <h3 className="text-[#001E1D] text-4xl font-semibold mb-15">
              {wordl}
            </h3>
            <p className="text-[#004643] text-3xl font-extrabold mb-1">
              Үгийн тайлбар:
            </p>
            <p className="text-white text-3xl font-semibold mb-4">
              {formattedDef}
            </p>
            <button
              onClick={closeModal}
              className="text-xl text-white bg-[#004643] text-black p-2 rounded-md font-extrabold mt-6"
            >
              Хаах
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
