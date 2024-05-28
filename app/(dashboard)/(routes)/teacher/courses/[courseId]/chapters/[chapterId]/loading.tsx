import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="animate-spin">
        <Loader />
      </div>
    </div>
  );
};

export default Loading;
