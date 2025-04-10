import { createContext, useState, useContext } from "react";

const DataDuremUgContext = createContext();

export function useDataDuremUgContext() {
  return useContext(DataDuremUgContext);
}

const DataDuremUgProvider = ({ children }) => {
  let duremUg = [
    {
      result: [
        {
          result: "Үзье",
          score: 1,
        },
        {
          result: "Үзэе",
          score: 0,
        },
        {
          result: "Үзъе",
          score: 0,
        },
        {
          result: "Үзе",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Хорооё",
          score: 1,
        },
        {
          result: "Хорооьё",
          score: 0,
        },
        {
          result: "Хорооъё",
          score: 0,
        },
        {
          result: "Хороооё",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Уяя",
          score: 1,
        },
        {
          result: "Уяья",
          score: 0,
        },
        {
          result: "Уяъя",
          score: 0,
        },
        {
          result: "Уяая",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Уншъя",
          score: 1,
        },
        {
          result: "Уншия",
          score: 0,
        },
        {
          result: "Унший",
          score: 0,
        },
        {
          result: "Уншя",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Даарч",
          score: 1,
        },
        {
          result: "Даараж",
          score: 0,
        },
        {
          result: "Даарж",
          score: 0,
        },
        {
          result: "Даарач",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Авч",
          score: 1,
        },
        {
          result: "Авж",
          score: 0,
        },
        {
          result: "Аваж",
          score: 0,
        },
        {
          result: "Авач",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Сурч",
          score: 1,
        },
        {
          result: "Сурж",
          score: 0,
        },
        {
          result: "Сураж",
          score: 0,
        },
        {
          result: "Сурач",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Дуусаж",
          score: 1,
        },
        {
          result: "Дуусч",
          score: 0,
        },
        {
          result: "Дуусж",
          score: 0,
        },
        {
          result: "Дуусач",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Ханилж",
          score: 1,
        },
        {
          result: "Ханилаж",
          score: 0,
        },
        {
          result: "Ханьлаж",
          score: 0,
        },
        {
          result: "Ханьлж",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "тусгаарлачхаад",
          score: 1,
        },
        {
          result: "тусгаарлачихаад",
          score: 0,
        },
        {
          result: "тусгааралчихаад",
          score: 0,
        },
        {
          result: "тусгааралчихаад",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "больчхоосой",
          score: 1,
        },
        {
          result: "больчихоосой",
          score: 0,
        },
        {
          result: "боличихоосой",
          score: 0,
        },
        {
          result: "боличхоосой",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "маллалаа",
          score: 1,
        },
        {
          result: "малалаа",
          score: 0,
        },
        {
          result: "маллаа",
          score: 0,
        },
        {
          result: "малаллаа",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "төллөлөө",
          score: 1,
        },
        {
          result: "төллөө",
          score: 0,
        },
        {
          result: "төлөлөө",
          score: 0,
        },
        {
          result: "төлөллөө",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "авьяасаа",
          score: 1,
        },
        {
          result: "авьясаа",
          score: 0,
        },
        {
          result: "авъяасаа",
          score: 0,
        },
        {
          result: "авъясаа",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "нөхдөдөө",
          score: 1,
        },
        {
          result: "нөхддөө",
          score: 0,
        },
        {
          result: "нөхөдөдөө",
          score: 0,
        },
        {
          result: "нөхөддөө",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Танд",
          score: 1,
        },
        {
          result: "Таньд",
          score: 0,
        },
        {
          result: "Танъд",
          score: 0,
        },
        {
          result: "Танид",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Тоолбол",
          score: 1,
        },
        {
          result: "Тоолвол",
          score: 0,
        },
        {
          result: "Тоолвал",
          score: 0,
        },
        {
          result: "Тоолбал",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Чадвал",
          score: 1,
        },
        {
          result: "Чадбал",
          score: 0,
        },
        {
          result: "Чадуул",
          score: 0,
        },
        {
          result: "Чадавал",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "Үзвэл",
          score: 1,
        },
        {
          result: "Үзүүл",
          score: 0,
        },
        {
          result: "Үзбэл",
          score: 0,
        },
        {
          result: "Үзэвэл",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "хавтасла",
          score: 1,
        },
        {
          result: "хавтасал",
          score: 0,
        },
        {
          result: "хавцасла",
          score: 0,
        },
        {
          result: "хавцасал",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "мөнхөжнө",
          score: 1,
        },
        {
          result: "мөнхжинө",
          score: 0,
        },
        {
          result: "мөнхжөнө",
          score: 0,
        },
        {
          result: "мөнхжнө",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "харзнаж",
          score: 1,
        },
        {
          result: "харзанаж",
          score: 0,
        },
        {
          result: "харзанж",
          score: 0,
        },
        {
          result: "харазнж",
          score: 0,
        },
      ],
    },
    {
      result: [
        {
          result: "эвлэвэл",
          score: 1,
        },
        {
          result: "эвлэбэл",
          score: 0,
        },
        {
          result: "эвэлбэл",
          score: 0,
        },
        {
          result: "эвэлвэл",
          score: 0,
        },
      ],
    },
  ];

  //data

  const [duremUgdata] = useState(duremUg);

  return (
    <DataDuremUgContext.Provider value={{ duremUgdata }}>
      {children}
    </DataDuremUgContext.Provider>
  );
};
export default DataDuremUgProvider;
