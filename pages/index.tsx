export default function HomePage() {
  return (
    <div className="text-white bg-black container mx-auto mt-10">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl">movr.domains</h1>
        <span className="text-green mt-1.5">
          [Version 0.0.1]{" "}
          <span className="bg-red-500 text-white p-1 rounded text-xs ml-2 font-bold">
            TESTNET
          </span>
        </span>
      </div>
      <div className="mt-3">
        <span className="text-red-500 uppercase font-bold text-sm">
          System Offline
        </span>
      </div>
    </div>
  );
}
