import { createContext, useState, useContext } from "react";

const DataKheltsContext = createContext();

export function useDataKheltsContext() {
  return useContext(DataKheltsContext);
}

const DataKheltsProvider = ({ children }) => {
  let kheltsUg = [
    {
      tailbar: "Ам булаалдах",
      result: [
        {
          result: "Өрсөн ярих",
          score: 1,
        },
        {
          result: "Өлсөх",
          score: 0,
        },
        {
          result: "Их чалчих",
          score: 0,
        },
        {
          result: "Хоол харамлах",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Баян ходоод",
      result: [
        {
          result: "Хамгийн сүүл",
          score: 1,
        },
        {
          result: "Цатгалан",
          score: 0,
        },
        {
          result: "Эд хөрөнгө ихтэй",
          score: 0,
        },
        {
          result: "Шим тэжээл дүүрэн",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Барьц алдах",
      result: [
        {
          result: "Сандрах",
          score: 1,
        },
        {
          result: "Юм унагах",
          score: 0,
        },
        {
          result: "Хожигдох",
          score: 0,
        },
        {
          result: "Хүчгүй болох",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Гар татах",
      result: [
        {
          result: "Харамлах",
          score: 1,
        },
        {
          result: "Өвдөх",
          score: 0,
        },
        {
          result: "Зодох",
          score: 0,
        },
        {
          result: "Туслах",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Хөл хүндтэй",
      result: [
        {
          result: "Жирэмсэн",
          score: 1,
        },
        {
          result: "Бүдүүн",
          score: 0,
        },
        {
          result: "Удаан гүйдэг",
          score: 0,
        },
        {
          result: "Хүнд ачаатай",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Ул шагайх",
      result: [
        {
          result: "Муухай дурлах",
          score: 1,
        },
        {
          result: "Доор орох",
          score: 0,
        },
        {
          result: "Ялагдах",
          score: 0,
        },
        {
          result: "Дээрлэхүүлэх",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Толгой өөд татахгүй",
      result: [
        {
          result: "Завгүй",
          score: 1,
        },
        {
          result: "Үл тоох",
          score: 0,
        },
        {
          result: "Санаа олохгүй байх",
          score: 0,
        },
        {
          result: "Гуниглах",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Морьдтой явах",
      result: [
        {
          result: "Азтай байх",
          score: 1,
        },
        {
          result: "Яарах",
          score: 0,
        },
        {
          result: "Хол явах",
          score: 0,
        },
        {
          result: "Олуулаа явах",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Дэнгийн эрвээхий шиг",
      result: [
        {
          result: "Аальгүй",
          score: 1,
        },
        {
          result: "Жижигхэн",
          score: 0,
        },
        {
          result: "Ядаргаатай",
          score: 0,
        },
        {
          result: "Шөнө унтахгүй байх",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Суганд хавчуулах",
      result: [
        {
          result: "Ивээлд байх",
          score: 1,
        },
        {
          result: "Гадуурхах",
          score: 0,
        },
        {
          result: "Эзлэх",
          score: 0,
        },
        {
          result: "Хажуудаа байлгах",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Зүрх ихтэй",
      result: [
        {
          result: "Зоригтой",
          score: 1,
        },
        {
          result: "Хайртай",
          score: 0,
        },
        {
          result: "Аминдаа хайргүй",
          score: 0,
        },
        {
          result: "Өвчинтэй",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Нүд бүлтийх",
      result: [
        {
          result: "Гайхах",
          score: 1,
        },
        {
          result: "Их унтах",
          score: 0,
        },
        {
          result: "Уйлах",
          score: 0,
        },
        {
          result: "Хараа муудах",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Алтан хошуу өргөх",
      result: [
        {
          result: "Ховлох",
          score: 1,
        },
        {
          result: "Ялах",
          score: 0,
        },
        {
          result: "Бахархуулах",
          score: 0,
        },
        {
          result: "Урам өгөх",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Нүд хорсох",
      result: [
        {
          result: "Үзэн ядах",
          score: 1,
        },
        {
          result: "Ядрах",
          score: 0,
        },
        {
          result: "Уйлах",
          score: 0,
        },
        {
          result: "Салхинд цохиулах",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Хөл газар хүрэхгүй",
      result: [
        {
          result: "Баярлах",
          score: 1,
        },
        {
          result: "Нисэх",
          score: 0,
        },
        {
          result: "Үсрэх",
          score: 0,
        },
        {
          result: "Гуниглах",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Могойд хатгуулсан юм шиг",
      result: [
        {
          result: "Ухасхийн босох",
          score: 1,
        },
        {
          result: "Хортой",
          score: 0,
        },
        {
          result: "Гэнэт өвдөх",
          score: 0,
        },
        {
          result: "Ядаргаатай",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Сүүл хавчих",
      result: [
        {
          result: "Айх",
          score: 1,
        },
        {
          result: "Шээс хүрэх",
          score: 0,
        },
        {
          result: "Гутрах",
          score: 0,
        },
        {
          result: "Ичих",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Амь тавих",
      result: [
        {
          result: "Их хайрлах",
          score: 1,
        },
        {
          result: "Үхэнгээ алдах",
          score: 0,
        },
        {
          result: "Тайван байх",
          score: 0,
        },
        {
          result: "Бооцоо тавих",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Чихнээс хонх уях",
      result: [
        {
          result: "Санаа зовоох",
          score: 1,
        },
        {
          result: "Бэлэг өгөх",
          score: 0,
        },
        {
          result: "Худлаа ярих",
          score: 0,
        },
        {
          result: "Өдөх",
          score: 0,
        },
      ],
    },
    {
      tailbar: "Шил нь татах",
      result: [
        {
          result: "Зөрүүдлэх",
          score: 1,
        },
        {
          result: "Өвдөх",
          score: 0,
        },
        {
          result: "Үнэтэй юмаа гээх",
          score: 0,
        },
        {
          result: "Хагарах",
          score: 0,
        },
      ],
    },
  ];

  //data

  const [kheltsdata] = useState(kheltsUg);

  return (
    <DataKheltsContext.Provider value={{ kheltsdata }}>
      {children}
    </DataKheltsContext.Provider>
  );
};
export default DataKheltsProvider;
