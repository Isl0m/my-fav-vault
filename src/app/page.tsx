import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen p-24">
      <div className="flex flex-col items-center justify-between gap-8 max-w-xl mx-auto">
        <h1 className="text-5xl text-slate-900 text-center font-black">
          <span className="underline decoration-8 decoration-sky-400 dark:decoration-sky-600">
            Sign up,
          </span>{" "}
          fill your info, share profile.
        </h1>
        <p>
          and show your friends who you are in 3 items. 😉
        </p>
        <div>
          <Link href="/auth">
            <button
              type="button"
              className="text-white bg-sky-500 hover:bg-sky-700 font-medium rounded-lg 
            text-sm px-5 py-2.5 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700"
            >
              Get started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
