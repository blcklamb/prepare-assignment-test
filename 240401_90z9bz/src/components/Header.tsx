"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0  mx-auto h-14 z-10 px-4 flex justify-between items-center">
      <div className="w-full h-full flex justify-between">
        <div className="p-4">NextJS</div>
        <button className="p-4">로그인</button>
      </div>
    </header>
  );
}
