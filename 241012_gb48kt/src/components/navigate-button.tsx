import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

interface NavigationButtonProps {
  type: "prev" | "next";
  onClick: () => void;
}

export function NavigationButton({ type, onClick }: NavigationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[60px] w-[60px] items-center justify-center z-10"
    >
      {type === "prev" && (
        <FaArrowAltCircleLeft className="w-full h-full opacity-50" />
      )}
      {type === "next" && (
        <FaArrowAltCircleRight className="w-full h-full opacity-50" />
      )}
    </button>
  );
}
