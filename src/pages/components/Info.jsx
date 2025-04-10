import Image from "next/image";
import { useRouter } from "next/router";

export default function InfoCard() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full justify-center items-center bg-[#11413B]">
      <div className="w-full min-h-full  bg-[#11413B] rounded-[25px] overflow-hidden ">
        {/* Header */}
        <div className="bg-[#F5C26B] max-w-md m-auto h-[120px] relative rounded-b-[40px] flex justify-center items-end pb-3">
          <div className="absolute -bottom-8">
            <div className="w-[80px] h-[80px] rounded-full bg-gray-400 border-[4px] border-white flex items-center justify-center">
              <Image
                src="/duck-avatar.png"
                alt="avatar"
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>

        {/* Name & Code */}
        <div className="mt-12 text-center">
          <h1 className="text-white text-[20px] font-bold">ЭРХЭМ ГАНЗОРИГ</h1>
          <p className="text-[#C9C9C9] text-[14px]">14S0326</p>
        </div>

        {/* Info Box */}
        <div className="bg-[#E8E4E6] max-w-md  mx-auto mt-4 rounded-[15px] border-[2px] border-[#A5BFF5] p-3">
          <table className="w-full border-collapse text-[14px]">
            <tbody>
              <tr className="border-b-[1.5px] border-[#C9C9C9]">
                <td className="py-2 font-semibold text-[#5E5E5E]">Анги</td>
                <td className="py-2 text-right font-bold text-black">11В</td>
              </tr>
              <tr className="border-b-[1.5px] border-[#C9C9C9]">
                <td className="py-2 font-semibold text-[#5E5E5E]">Хүйс</td>
                <td className="py-2 text-right font-bold text-black">
                  Эрэгтэй
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-[#5E5E5E]">Түвшин</td>
                <td className="py-2 text-right font-bold text-black">III</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Stats */}
        <div className="flex bg-[#F0F0F0] rounded-[15px] w-md  mx-auto mt-5 text-center overflow-hidden">
          <div className="w-1/3 py-3 border-r border-gray-300">
            <p className="font-bold text-[20px]">7</p>
            <p className="text-[12px] text-gray-600">Гал</p>
          </div>
          <div className="w-1/3 py-3 border-r border-gray-300">
            <p className="font-bold text-[20px]">1</p>
            <p className="text-[12px] text-gray-600">Байр</p>
          </div>
          <div className="w-1/3 py-3">
            <p className="font-bold text-[20px]">2370</p>
            <p className="text-[12px] text-gray-600">Оноо</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex max-w-md m-auto justify-between items-center py-6 text-[14px] font-semibold text-[#F5C26B]">
          <button
            className="flex items-center gap-2"
            onClick={() => router.back()}
          >
            <span className="text-[18px]">←</span> БУЦАХ
          </button>
          <button className="border-b border-[#F5C26B]">ГАРАХ</button>
        </div>
      </div>
    </div>
  );
}
