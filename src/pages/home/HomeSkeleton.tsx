import Skeleton from "react-loading-skeleton";

const HomeSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-6 p-14">
      {Array.from(Array(12)).map((x) => (
        <div className="shadow-[0px_2px_8px_0px_rgba(0,0,0,.10)] bg-white rounded-lg ">
          <Skeleton containerClassName="rounded-lg h-[180px] w-full" />
          <div className="p-[18px] ">
            <Skeleton width={112} height={20} containerClassName="mb-4" />
            <Skeleton width={144} height={20} containerClassName=" mb-4 " />
            <Skeleton width={80} height={20} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeSkeleton;
