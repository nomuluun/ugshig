import { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useDataTailbarContext } from "../context/data/DataTailbarContext";
import { useTailbarLevelContext } from "../context/TailbarLevelContext";
import { useRouter } from "next/router";
import { cloneElement } from "react";
import { useUser } from "../context/UserContext";

export default function TailbarUg() {
  const { user, setUser } = useUser();
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); //index
  const [slots, setSlots] = useState({});
  const [correctSlots, setCorrectSlots] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [showFinal, setShowFinal] = useState(false); //nuhtsul
  const [wrongAnswers, setWrongAnswers] = useState([]); //buruu hiisen hariultuud
  const [score, setScore] = useState(0); //onoo
  const [shuffledMeanings, setShuffledMeanings] = useState([]);
  const [timeLeft, setTimeLeft] = useState(40); //hugatsaa
  const wrongIds = []; //buruu hiisen dasgaluud
  const router = useRouter();
  const { tailbarround, setTailbarRound } = useTailbarLevelContext(); //tvshin
  const { tailbardata } = useDataTailbarContext(); //data

  useEffect(() => {
    if (showFinal) {
      if (score == 16) {
        user.task[2][`lvl${tailbarround}`] = true;
      }
      if (tailbarround === 3 && score < 16) return;
      user.score = user.score + score * tailbarround * 5;
    }
  }, [showFinal]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleCheckAnswers(null);
      return;
    }
    if (showFinal || tailbarround === 1) return;
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
  //countdown timer

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };
  //format time

  useEffect(() => {
    const shuffled = [...tailbardata].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);
  //First shuffle

  useEffect(() => {
    if (
      shuffledQuestions.length > 0 &&
      currentIndex < shuffledQuestions.length
    ) {
      const currentQuestions = shuffledQuestions.slice(
        currentIndex,
        currentIndex + 4
      );
      const shuffled = [...currentQuestions].sort(() => Math.random() - 0.5);
      setShuffledMeanings(shuffled);
    }
  }, [currentIndex, shuffledQuestions]);
  //Utga shuffle

  const currentQuestions = shuffledQuestions.slice(
    currentIndex,
    currentIndex + 4
  );
  //4n asuult avah
  const remainingWords = currentQuestions.filter(
    (item) => !Object.values(slots).includes(item.word)
  );
  //Deer uldsen ugs

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedWord = active.id;
    const targetId = over.id;

    if (targetId === "word-pool") {
      const existingSlotId = Object.keys(slots).find(
        (key) => slots[key] === draggedWord
      );

      if (existingSlotId) {
        setSlots((prev) => {
          const updated = { ...prev };
          delete updated[existingSlotId];
          return updated;
        });
      }
      return;
    }

    const existingSlotId = Object.keys(slots).find(
      (key) => slots[key] === draggedWord
    );

    setSlots((prev) => {
      const updated = { ...prev };

      if (existingSlotId) delete updated[existingSlotId];

      const replacedWord = updated[targetId];
      if (replacedWord) {
        const poolSlotId = Object.keys(slots).find(
          (key) => slots[key] === replacedWord
        );
        if (poolSlotId) delete updated[poolSlotId];
      }

      updated[targetId] = draggedWord;
      return updated;
    });
  };
  //zuuh

  const resTime = () => {
    setTimeLeft(0);
    return;
  };
  // next sub

  const handleCheckAnswers = () => {
    const updatedCorrectSlots = {};
    let correctCount = 0;
    currentQuestions.forEach((item) => {
      const isCorrect = slots[item.id] === item.word;
      updatedCorrectSlots[item.id] = isCorrect;
      if (isCorrect) correctCount++;
      else wrongIds.push(item);
    });
    setCorrectSlots(updatedCorrectSlots);
    setIsChecking(true);
    setScore((prev) => prev + correctCount);
    setWrongAnswers((prev) => [...prev, ...wrongIds]);
    setTimeout(() => {
      setTimeLeft(40);
      setIsChecking(false);
      setSlots({});
      setCorrectSlots({});
      if (wrongIds.length > 0 && tailbarround === 3) setShowFinal(1);
      if (currentIndex + 4 >= 16) {
        setShowFinal(true);
      } else {
        setCurrentIndex((prev) => prev + 4);
      }
    }, 1000);
  };
  //Check answers

  const progressPercent = showFinal ? 100 : (currentIndex / 16) * 100;

  return (
    <div className="min-h-screen bg-[#004643]">
      {!showFinal ? (
        <div className="flex flex-col items-center text-[#F5F5F5]">
          <div className="flex flex-col mt-[50px] z-1 items-center">
            <div className="flex w-[280px] justify-between">
              <h1 className="text-[15px] font-black">ҮГИЙН УТГА</h1>
              <h1 className="text-[15px] font-black">ТҮВШИН {tailbarround}</h1>
            </div>
            <div className="w-[280px] bg-[#ABD1C6] rounded-[15px] h-[16px] mb-4 overflow-hidden mt-[8px]">
              <div
                className="border border-[#ABD1C6] bg-[#004643] h-[16px] rounded-[15px] transition-all duration-1000 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            {currentIndex < 13 && tailbarround !== 1 && (
              <h2>Цаг: {formatTime(timeLeft)}</h2>
            )}
          </div>
          <div className="w-[328px] mt-[70px]">
            <h1 className="font-black text-15px text-center">
              Дараах үгсийг тайлбартай нь зөв харгалзуулна уу.
            </h1>
            <DndContext onDragEnd={handleDragEnd}>
              <DroppableWordPool>
                <div className="flex flex-wrap justify-center">
                  {remainingWords.map((item) => (
                    <DraggableWord key={item.word} id={item.word} />
                  ))}
                </div>
              </DroppableWordPool>

              <div className="flex flex-col gap-4 ">
                {shuffledMeanings.map((item) => (
                  <DroppableMeaning
                    key={item.id}
                    id={item.id}
                    meaning={item.meaning}
                    word={slots[item.id]}
                    isCorrect={correctSlots[item.id]}
                    isChecking={isChecking}
                  />
                ))}
              </div>
            </DndContext>
            <div className="flex justify-between items-center w-[328px] mt-8">
              <button
                onClick={() => router.push("/ugutga")}
                className="text-[#F2C26B] font-black text-15px px-6 py-2 hover:opacity-90"
              >
                <h1>← ГАРАХ</h1>
              </button>
              <button
                onClick={resTime}
                className="bg-[#F2C26B] text-[#000] text-[13px] font-medium flex justify-center items-center rounded-[15px] h-[28px] w-[100px] hover:opacity-90"
              >
                дараагийнх
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold mb-4">Дууслаа!</h1>
          <h2 className="text-2xl font-semibold">
            Таны оноо: {score} / {16}
          </h2>
          {wrongAnswers.length > 0 && (
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold mb-2">
                Буруу байсан үгс болон тайлбарууд:
              </h3>
              <table className="min-w-full table-auto text-left border-collapse border border-[#ABD1C6]">
                <thead className="bg-[#004643] text-white">
                  <tr>
                    <th className="py-2 px-4 border-b">Үг</th>
                    <th className="py-2 px-4 border-b">Тайлбар</th>
                  </tr>
                </thead>
                <tbody className="bg-[#F5F5F5]">
                  {wrongAnswers.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#ABD1C6] hover:bg-[#D3E7E1]"
                    >
                      <td className="py-2 px-4">{item.word}</td>
                      <td className="py-2 px-4">{item.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex justify-between w-[670px]">
            <button
              onClick={() => window.location.reload()}
              className="text-[#F2C26B] font-black text-15px px-6 py-2 hover:opacity-90"
            >
              <h1>ДАХИН ОРОЛДОХ</h1>
            </button>
            <button
              onClick={() => router.push("/ugutga")}
              className="text-[#F2C26B] font-black text-15px px-6 py-2 hover:opacity-90"
            >
              <h1>← ГАРАХ</h1>
            </button>
          </div>
        </div>
      )}
    </div>
  );
  //HTML code
}

function DraggableWord({ id, isInSlot }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: "transform 0.05s ease-out",
        zIndex: isDragging ? 999 : 1,
      }
    : {};

  const bgColor = isInSlot ? "#004643" : "white";
  const textColor = isInSlot ? "white" : "#004643";

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ ...dragStyle, backgroundColor: bgColor, color: textColor }}
      className="m-1 font-medium px-[10px] h-[25px] text-[13px] rounded-[10px] cursor-grab flex justify-center items-center"
    >
      {id}
    </div>
  );
}
//zuuj avj yvj boloh ugs

function DroppableMeaning({ id, meaning, word, isCorrect }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col items-center bg-[#F2C26B] min-h-[75px] p-1 px-2 rounded-lg text-center transition-all duration-1000 ease-in-out ${
        isOver
          ? "ring-2 ring-[#B3DAD6]"
          : isCorrect === true
          ? "scale-105 border-2 border-green-500"
          : isCorrect === false
          ? "border-2 border-red-500"
          : "border-2 border-transparent"
      }`}
    >
      <div className="mb-2 text-[#17443F] font-bold">{meaning}</div>
      <div
        className="bg-[#F5F5F5] min-h-[32px] w-[109px] text-[#17443F] rounded-[10px]"
        style={{ backgroundColor: word ? "#004643" : "#F5F5F5" }}
      >
        {word ? <DraggableWord id={word} isInSlot={true} /> : ""}
      </div>
    </div>
  );
}
//door ugsee tavij boloh ugsiin tailabr husnegt

function DroppableWordPool({ children }) {
  const { setNodeRef, isOver } = useDroppable({ id: "word-pool" });

  return (
    <div
      ref={setNodeRef}
      className={`py-3 transition-all duration-500 ${
        isOver ? "border-[#B3DAD6]" : "border-gray-500"
      }`}
    >
      {Array.isArray(children)
        ? children.map((child) => cloneElement(child, { isInSlot: false }))
        : cloneElement(children, { isInSlot: false })}
    </div>
  );
}

//deerh butsaj ug tavij boloh husnegt
