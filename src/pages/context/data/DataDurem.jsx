import { createContext, useState, useContext } from "react";

const DataDuremContext = createContext();

export function useDataDuremContext() {
  return useContext(DataDuremContext);
}

const DataDuremProvider = ({ children }) => {
  let durem = [
    {
      tailbar: "Я,Е,Ё залгахад хатуугийн тэмдэг жийрэглэнэ.",
      result: [
        { result: "Гийгүүлэгчээр төгссөн эр үг", score: 1 },
        { result: "Гийгүүлэгчээр төгссөн эм үг", score: 0 },
        { result: "Эгшгээр төгссөн үг", score: 0 },
        { result: "я,е,ё-оор төгссөн үг", score: 0 },
      ],
    },
    {
      tailbar: "Я,Е,Ё залгахад зөөлний тэмдэг жийрэглэнэ.",
      result: [
        { result: "Гийгүүлэгчээр төгссөн эм үг", score: 1 },
        { result: "Гийгүүлэгчээр төгссөн эр үг", score: 0 },
        { result: "Эгшгээр төгссөн үг", score: 0 },
        { result: "я,е,ё-оор төгссөн үг", score: 0 },
      ],
    },
    {
      tailbar: "Я,Е,Ё залгахад шууд залгана",
      result: [
        { result: "Эгшгээр төгссөн үг", score: 1 },
        { result: "Гийгүүлэгчээр төгссөн эм үг", score: 0 },
        { result: "Гийгүүлэгчээр төгссөн эр үг", score: 0 },
        { result: "Тийм нөхцөл байхгүй.", score: 0 },
      ],
    },
    {
      tailbar: "Зөөлний тэмдэг И болно.",
      result: [
        { result: "9ь+9", score: 1 },
        { result: "“ь” + туслах эгшиг", score: 0 },
        { result: "7ь + 9", score: 0 },
        { result: '"ь" + "гүй"', score: 0 },
      ],
    },
    {
      tailbar: "Зөөлний тэмдэг И болохгүй.",
      result: [
        { result: '"ь" + "гүй"', score: 1 },
        { result: "“ь” + үндсэн эгшиг", score: 0 },
        { result: "“ь” + 7", score: 0 },
        { result: "“ь”+ х = и​", score: 0 },
      ],
    },
    {
      tailbar: '"Чих"-ийн И гээгдэнэ.',
      result: [
        { result: '7+"чих"+"аарай"', score: 1 },
        { result: '7+"чих"+Тийн ялгал', score: 0 },
        { result: '9+"чих"+Тийн ялгал', score: 0 },
        { result: '9+"чих"+"аарай"', score: 0 },
      ],
    },
    {
      tailbar: '"Чих"-ийн И гээгдэхгүй.',
      result: [
        { result: '7+"чих"+"аас"', score: 1 },
        { result: '7+"чих"+"аарай"', score: 0 },
        { result: '7+"чих"+"аад"', score: 0 },
        { result: '7+"чих"+"аасай"', score: 0 },
      ],
    },
    {
      tailbar: 'Б, В-ын "Б"-г залгана.',
      result: [
        { result: 'Үгийн дунд орсон "Л"-ын араас', score: 1 },
        { result: 'Үгийн дунд орсон "Р"-ын араас', score: 0 },
        { result: 'Үгийн дунд орсон "Г"-ын араас', score: 0 },
        { result: 'Үгийн дунд орсон "С"-ын араас', score: 0 },
      ],
    },
    {
      tailbar: 'Б, В-ын "В"-г залгана.',
      result: [
        { result: 'Үгийн дунд орсон "Г"-ын араас', score: 1 },
        { result: 'Үгийн дунд орсон "Л"-ын араас', score: 0 },
        { result: 'Үгийн дунд орсон "Н"-ын араас', score: 0 },
        { result: 'Үгийн дунд орсон "М"-ын араас', score: 0 },
      ],
    },
    {
      tailbar: 'Ж,Ч нөхцөлийн "Ж" нөхцөлийг залгана.',
      result: [
        { result: "Эгшгээр төгссөн үг", score: 1 },
        { result: "Гар, Хүр, Сур", score: 0 },
        {
          result: 'Урт ба хос эгшигтэй, ганц үетэй "Р"-ээр төгссөн үг',
          score: 0,
        },
        { result: 'Хоёроос дээш үетэй "Р"-ээр төгссөн үг', score: 0 },
      ],
    },
    {
      tailbar: 'Ж,Ч нөхцөлийн "Ч" нөхцөлийг залгана.',
      result: [
        {
          result: 'Урт ба хос эгшигтэй, ганц үетэй "Р"-ээр төгссөн үг',
          score: 1,
        },
        { result: "Эгшигт гийгүүлэгчээр төгссөн үг", score: 0 },
        {
          result: 'Богино эгшигтэй, ганц үетэй "Р", "Ь"-ээр төгссөн үг',
          score: 0,
        },
        { result: "Эгшгээр төгссөн үг", score: 0 },
      ],
    },
    {
      tailbar: 'Үйл үг бүтээх "Л" дагаврыг шууд залгана.',
      result: [
        { result: "Эгшгээр төгссөн үг", score: 1 },
        { result: "Эгшигт гийгүүлэгчээр төгссөн үг", score: 0 },
        { result: "Заримдаг гийгүүлэгчээр төгссөн үг", score: 0 },
        { result: "Зөөлний тэмдгээр төгссөн үг", score: 0 },
      ],
    },
    {
      tailbar: 'Үйл үг бүтээх "Л" дагаврыг "Ь"-ийн араас залгахад',
      result: [
        { result: "Зөөлний тэмдэг И болж шууд залгана.", score: 1 },
        { result: "Шууд залгана.", score: 0 },
        { result: "Ардаа эгшигтэй бичнэ.", score: 0 },
        { result: "Өмнөө эгшигтэй бичнэ.", score: 0 },
      ],
    },
    {
      tailbar: 'Үйл үг бүтээх "Л" дагаврыг залгахад ардаа эгшигтэй бичнэ.',
      result: [
        { result: "Эгшигт гийгүүлэгчээр төгссөн үг", score: 1 },
        { result: "Эгшгээр төгссөн үг", score: 0 },
        { result: "Заримдаг гийгүүлэгчээр төгссөн үг", score: 0 },
        { result: "Зөөлний тэмдгээр төгссөн үг", score: 0 },
      ],
    },
    {
      tailbar: 'Үйл үг бүтээх "Л" дагаврыг залгахад өмнөө эгшигтэй бичнэ.',
      result: [
        { result: "Заримдаг гийгүүлэгчээр төгссөн үг", score: 1 },
        { result: "Эгшигт гийгүүлэгчээр төгссөн үг", score: 0 },
        { result: "Эгшгээр төгссөн үг", score: 0 },
        { result: "Зөөлний тэмдгээр төгссөн үг", score: 0 },
      ],
    },
  ];

  //data

  const [duremdata] = useState(durem);

  return (
    <DataDuremContext.Provider value={{ duremdata }}>
      {children}
    </DataDuremContext.Provider>
  );
};
export default DataDuremProvider;
