import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="mt-14">
        <h1 className="text-3xl mb-2">
          Next-auth(v5)(AuthJS) + prisma + supabase 를 이용한 소셜 로그인
        </h1>
      </main>
    </div>
  );
}
