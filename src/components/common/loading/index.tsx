import LoadingSvg from "@/assets/icons/loading.svg";

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loading = ({ isLoading, children }: LoadingProps) => {
  return isLoading ? (
    <div className="animate-spin flex justify-center items-center h-full">
      <LoadingSvg />
    </div>
  ) : (
    children
  );
};

export default Loading;
