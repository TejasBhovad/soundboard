import "./styles/Utils.css";
import Link from "next/link";
const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <div className="container flex flex-col justify-center items-center">
        <h1 className="gradient-text md:text-[200px] text-[150px] font-bold p-0 mb-0 leading-none transition-all">
          404
        </h1>
        <span className="md:text-lg p-0 mb-0 text-sm transition-all">
          The page you are looking for doesn't exist
        </span>
      </div>
      <Link href="/">
        <button className="px-4 py-2 bg-secondary border-[1px] border-utility rounded-md">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
