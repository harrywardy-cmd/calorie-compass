type ProgressBarProps = {
  value: number;
  goal: number;
  color?: string;
};

export default function ProgressBar({
  value,
  goal,
  color = "bg-blue-500",
}: ProgressBarProps) {
  const percentage = Math.min(
    Math.round((value / goal) * 100),
    100
  );

  return (
    <div className="mt-3">
      {/* Track */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        {/* Fill */}
        <div
          className={`
            h-full
            rounded-full
            transition-all
            duration-500
            ${color}
          `}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}