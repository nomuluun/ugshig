import { createContext, useContext, useState } from "react";

const WordleUgContext = createContext();

const WordleUgProvider = ({ children }) => {
  let asuultData = [
    { word: "агас", definition: "хатдын хүндэтгэл" },
    { word: "агууриг", definition: "зай тусгал, цар хүрээ" },
    { word: "азарга", definition: "гэмт хэрэгтнийг агдлан хорих хэрэгсэл" },
    { word: "амангал", definition: "өлзий бус" },
    { word: "архаг", definition: "даамжран тогтсон муу зуршил" },
    { word: "аюус", definition: "айх айдас, балмагдал" },
    { word: "бонго", definition: "наадгай" },
    {
      word: "галдаа",
      definition: "баруун, зүүн гарын дарга хэмээх албан тушаалтан",
    },
    { word: "гатан", definition: "бичмэл тушаал, заавар, зөвшөөрлийн бичиг" },
    { word: "гашуг", definition: "зарлигийн бичиг" },
    { word: "гочиха", definition: "шадар, дотно" },
    { word: "гутарь", definition: "сайн хүн эвдрэх явдал" },
    { word: "жууз", definition: "хүн сууж явах дамнуурган сүйх" },
    { word: "нүдэвч", definition: "сохор хүнийг газарчлах хүн" },
    { word: "оог", definition: "үе дамжсан боол" },
    { word: "отог", definition: "хуучны засаг захиргааны нэгж" },
    { word: "пог", definition: "сан жасаанаас лам нарт өгсөн хувь, түгээл" },
    { word: "пүнлүү", definition: "тогтмол сул цалин" },
    {
      word: "савслага",
      definition: "хоёр этгээдээс хавчих хэрэгсэл, есөн эрүүгийн нэг",
    },
    { word: "самтав", definition: "байлдаанд өмсөх хормогч" },
    { word: "сараалж", definition: "есөн эрүүний нэг" },
    { word: "сияан", definition: "засаг хошуу" },
    {
      word: "сойвон",
      definition: "хутагт хувилгаадын шадар бараа бологчдын ахмад тушаалтан",
    },
    {
      word: "сүрлэг",
      definition: "дайтах үед нум сумнаас хамгаалах нэгэн арга",
    },
    { word: "тавнан", definition: "хаад ноёдын хүргэн" },
    {
      word: "тайгам",
      definition: "олон хошуу нутгийн хилийг харгалзагч харуул",
    },
    { word: "тайз", definition: "хаан ширээг залгамжлан суух хөвгүүн" },
    { word: "татуур", definition: "эхнэр хүний тоорцог мэт толгойн чимэг" },
    { word: "тоног", definition: "дайн тулаанд ялсны гэрч болгон авах эд юм" },
    { word: "тоногчин", definition: "тоног авагч" },
    { word: "тохь", definition: "дөрвөн үе болсон боол" },
    { word: "туйв", definition: "үс гэзэгний залгаа; эхнэр хүний үсний гэр" },
    { word: "төмөг", definition: "саран сүх хэлбэртэй цэргийн зэвсэг" },
    { word: "туйван", definition: "есөн эрүүний нэг" },
    {
      word: "тунхагч",
      definition: "ардын дунд ухуулга суртал тархаах тушаалтан",
    },
    { word: "турхаг", definition: "их хааны өргөөг хамгаалах харуул манаа" },
    { word: "тууль", definition: "уулгалан дайрч олз авах" },
    {
      word: "түүрэг",
      definition: "хотын хэрмийн гадуур барьсан хүй хүй айл; дүүрэг",
    },
    { word: "тэвч", definition: "алах, үхүүлэх" },
    { word: "улаа", definition: "өртөө" },
    { word: "үрлэг", definition: "ял хэлтрүүлэх хааны зарлигийн бичиг" },
    { word: "үтрэмлэ", definition: "харван алахын цээрлэл" },
    { word: "хаван", definition: "хиа нарын дарга" },
    { word: "хамжлага", definition: "ард" },
    { word: "харуусч", definition: "хулгай босуулыг барих үүрэгтэн" },
    { word: "хурилдай", definition: "их хурим найр" },
    { word: "ялууд", definition: "үүд хаалга хааж хөндлөн модоор хөших" },
  ];

  const [asuult] = useState(asuultData);
  return (
    <WordleUgContext.Provider value={{ asuult }}>
      {children}
    </WordleUgContext.Provider>
  );
};
export default WordleUgProvider;
export const useWordleUgContext = () => useContext(WordleUgContext);
