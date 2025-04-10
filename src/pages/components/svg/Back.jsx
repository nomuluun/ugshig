"use client";

import { useRouter } from "next/router";

export default function Back() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/zuvbichig")}
      className="flex flex-row cursor-pointer h-[20px] w-[70px] items-center justify-between"
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.3539 15.2577C19.2152 14.0558 19.2152 10.9443 17.3539 9.74231L6.11537 2.48492C4.30637 1.31673 2.08325 2.83721 2.08325 5.24264V19.7574C2.08325 22.1629 4.30637 23.6834 6.11537 22.5151L17.3539 15.2577Z"
          fill="#F9BC60"
        />
        <path
          d="M23.6978 5.20837C23.6978 4.77691 23.348 4.42712 22.9165 4.42712C22.485 4.42712 22.1353 4.77691 22.1353 5.20837V19.7917C22.1353 20.2232 22.485 20.573 22.9165 20.573C23.348 20.573 23.6978 20.2232 23.6978 19.7917V5.20837Z"
          fill="#F9BC60"
        />
      </svg>

      <h1 className="text-[12px] text-[#F9BC60] font-black">Гарах</h1>
    </div>
  );
}
