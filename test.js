export default function Home() {
    const commonClasses =
      "flex w-1/2 h-1/2 items-center justify-center animate-pulse absolute";
    return (
      <main className="select-none">
        <div className={`${commonClasses} left-0 top-0 bg-red-400`} />
        <div className={`${commonClasses} right-0 top-0 bg-yellow-400`} />
        <div className={`${commonClasses} left-0 bottom-0 bg-green-400`} />
        <div className={`${commonClasses} right-0 bottom-0 bg-blue-400`} />
      </main>
    );
   }