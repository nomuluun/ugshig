import { createContext, useState, useContext } from "react";

const DataJuramContext = createContext();

export function useDataJuramContext() {
  return useContext(DataJuramContext);
}

const DataJuramProvider = ({ children }) => {
  let juramUg = [
    {
      tailbar: "удаавтар; хожим",
      result: [
        {
          result: "аажуувтар",
          score: 1,
        },
        {
          result: "айжуувтар",
          score: 0,
        },
        {
          result: "аажиувтар",
          score: 0,
        },
        {
          result: "айжувтар",
          score: 0,
        },
      ],
    },
    {
      tailbar: "эд эрхтэнд гараар болон мэсээр хийх эмчилгээний арга",
      result: [
        {
          result: "ажиллавар",
          score: 0,
        },
        {
          result: "ажилбар",
          score: 1,
        },
        {
          result: "ажилвар",
          score: 0,
        },
        {
          result: "ажливар",
          score: 0,
        },
      ],
    },
    {
      tailbar: "эрдэж бардсан байдалтай",
      result: [
        {
          result: "бардангуй",
          score: 0,
        },
        {
          result: "бардангуу",
          score: 0,
        },
        {
          result: "бардамгуй",
          score: 1,
        },
        {
          result: "бардамгуу",
          score: 0,
        },
      ],
    },
    {
      tailbar: "монгол ардын бүжгийн нэг төрөл",
      result: [
        {
          result: "биелгээ",
          score: 1,
        },
        {
          result: "бийлгээ",
          score: 0,
        },
        {
          result: "биелэгээ",
          score: 0,
        },
        {
          result: "бийлэгээ",
          score: 0,
        },
      ],
    },
    {
      tailbar: "үнэр өмхий амьтан",
      result: [
        {
          result: "өмхий хүрнэ",
          score: 1,
        },
        {
          result: "өмхий хүрэн",
          score: 0,
        },
        {
          result: "өмхий хүрэм",
          score: 0,
        },
        {
          result: "өмхий хүрин",
          score: 0,
        },
      ],
    },
    {
      tailbar: "яйжгар",
      result: [
        {
          result: "майжгар",
          score: 1,
        },
        {
          result: "маажгар",
          score: 0,
        },
        {
          result: "маажигар",
          score: 0,
        },
        {
          result: "майжигар",
          score: 0,
        },
      ],
    },
    {
      tailbar: "шим шүлт, амт шимт; хазахад тэсэх даац",
      result: [
        {
          result: "зажилбар",
          score: 1,
        },
        {
          result: "жажилбар",
          score: 0,
        },
        {
          result: "зажьлабар",
          score: 0,
        },
        {
          result: "зажилабар",
          score: 0,
        },
      ],
    },
    {
      tailbar: "шаналгаа, сэтгэлийн",
      result: [
        {
          result: "зовуурь",
          score: 1,
        },
        {
          result: "зовиур",
          score: 0,
        },
        {
          result: "зовуур",
          score: 0,
        },
        {
          result: "зовуйр",
          score: 0,
        },
      ],
    },
    {
      tailbar: "буддын шашны нэг зүйл гол уншлагын ном",
      result: [
        {
          result: "маани",
          score: 1,
        },
        {
          result: "маань",
          score: 0,
        },
        {
          result: "майна",
          score: 0,
        },
        {
          result: "майн",
          score: 0,
        },
      ],
    },
    {
      tailbar: "эрхэндээ оруулах",
      result: [
        {
          result: "номхотгох",
          score: 1,
        },
        {
          result: "номхтгох",
          score: 0,
        },
        {
          result: "номхтогох",
          score: 0,
        },
        {
          result: "номохтгох",
          score: 0,
        },
      ],
    },
    {
      tailbar: "царай дорой, уруу унжгар",
      result: [
        {
          result: "нурмагар",
          score: 1,
        },
        {
          result: "нурамгар",
          score: 0,
        },
        {
          result: "нурмгар",
          score: 0,
        },
        {
          result: "нуримгар",
          score: 0,
        },
      ],
    },
    {
      tailbar: "олон удаа",
      result: [
        {
          result: "олонтоо",
          score: 1,
        },
        {
          result: "олонтой",
          score: 0,
        },
        {
          result: "олонтаа",
          score: 0,
        },
        {
          result: "олонтай",
          score: 0,
        },
      ],
    },
    {
      tailbar: "оношлох үйлийн нэр",
      result: [
        {
          result: "оношилгоо",
          score: 1,
        },
        {
          result: "оношлогоо",
          score: 0,
        },
        {
          result: "оншилгоо",
          score: 0,
        },
        {
          result: "оншолгоо",
          score: 0,
        },
      ],
    },
    {
      tailbar: "цаг агаар дулаан, зуд турхангүй үе",
      result: [
        {
          result: "өнтэй",
          score: 1,
        },
        {
          result: "өнтээ",
          score: 0,
        },
        {
          result: "өнөтэй",
          score: 0,
        },
        {
          result: "өнөтээ",
          score: 0,
        },
      ],
    },
    {
      tailbar: "сарниун, тусгаар",
      result: [
        {
          result: "саланги",
          score: 1,
        },
        {
          result: "саланга",
          score: 0,
        },
        {
          result: "саланг",
          score: 0,
        },
        {
          result: "салнаг",
          score: 0,
        },
      ],
    },
    {
      tailbar: "сэдэж санаачлах үйлийн нэр, шинэ",
      result: [
        {
          result: "санаачилга",
          score: 1,
        },
        {
          result: "санаачлага",
          score: 0,
        },
        {
          result: "санаачлаг",
          score: 0,
        },
        {
          result: "санаачлиг",
          score: 0,
        },
      ],
    },
    {
      tailbar: "дугуй хэлбэртэй, цагаан, ногоон навчтай, хүнсний ногоо",
      result: [
        {
          result: "байцай",
          score: 1,
        },
        {
          result: "байцаа",
          score: 0,
        },
        {
          result: "баяцай",
          score: 0,
        },
        {
          result: "баацай",
          score: 0,
        },
      ],
    },
    {
      tailbar: "баттай болох",
      result: [
        {
          result: "батажна",
          score: 1,
        },
        {
          result: "батжина",
          score: 0,
        },
        {
          result: "батжин",
          score: 0,
        },
        {
          result: "батжана",
          score: 0,
        },
      ],
    },
    {
      tailbar: "самгардах, сольж эндүүрэх",
      result: [
        {
          result: "будилах",
          score: 1,
        },
        {
          result: "будлих",
          score: 0,
        },
        {
          result: "будьлах",
          score: 0,
        },
        {
          result: "будлах",
          score: 0,
        },
      ],
    },
    {
      tailbar: "хүнсний ~, үйлдвэрийн ~",
      result: [
        {
          result: "бүтээгдэхүүн",
          score: 1,
        },
        {
          result: "бүтээгдхүүн",
          score: 0,
        },
        {
          result: "бүтээгдхүн",
          score: 0,
        },
        {
          result: "бүтэгдхүүн",
          score: 0,
        },
      ],
    },
  ];
  //data

  const [juramdata] = useState(juramUg);

  return (
    <DataJuramContext.Provider value={{ juramdata }}>
      {children}
    </DataJuramContext.Provider>
  );
};
export default DataJuramProvider;
