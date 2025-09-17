import { staticFiles } from "../../config/statics";

const BgSignUp = (): JSX.Element => {
  return (
    <>
      <div className="h-auto col-span-12">
        <img
          src={staticFiles.fondoLogin}
          alt={staticFiles.fondoLogin}
          className="w-screen h-screen px-10"
        />
      </div>
      <div className="absolute inset-0 opacity-80 bg-gradient-to-b from-gray-500 to-gray-900"></div>
    </>
  );
};

export default BgSignUp;
