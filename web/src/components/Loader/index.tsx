import { FC } from "react";

const Loader: FC<{ type: "component" | "page" }> = ({ type = "page" }) => {
  const loaderClass =
    "inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]";

  if (type === "component") {
    return <div className={loaderClass} role="status" />;
  }

  return (
    <div className="fixed top-0 h-screen w-full bg-black bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <div className={loaderClass} role="status" />
    </div>
  );
};

export default Loader;
