import Image from "next/image";

export default function HomePage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="text-center max-w-2xl">
        <div className="mb-2">
          <Image
            src="/logo.png"
            height="109px"
            width="800px"
            alt="MOVR Domains Logo"
          />
        </div>
        <div className="text-lg">
          <p className="text-xl font-bold uppercase text-yellow">
            Mapping the Kusama and Polkadot ecosystems
          </p>
          <p className="text-gray-300 uppercase text-base">
            Names to the numbers
          </p>
          <div className="mt-10">
            <span className="uppercase">Arriving</span>
            <h2 className="text-8xl font-bold">Q1 2022</h2>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mx-auto">
            <img src="/animated.png" width="175" height="280" />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0">
        <p>Twitter</p>
      </div>
    </div>
  );
}
