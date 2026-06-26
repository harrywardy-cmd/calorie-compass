type ProgressBarProps = {
  value: number;
  goal: number;
};

export default function ProgressBar({
  value,
  goal,
}: ProgressBarProps) {
  const percentage = Math.min(
    (value / goal) * 100,
    100
  );

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
      <div
        className="
          h-full
          rounded-full
          bg-blue-500
          transition-all
          duration-500
        "
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
}