type CircularProgressProps = {
  value: number;
  goal: number;
};

export default function CircularProgress({
  value,
  goal,
}: CircularProgressProps) {
  const percentage = Math.min(
    Math.round((value / goal) * 100),
    100
  );

  const radius = 34;
  const stroke = 8;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (percentage / 100) * circumference;

  return (
    <div className="relative h-24 w-24">

      <svg
        className="-rotate-90"
        width="96"
        height="96"
      >
        {/* Background */}

        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={stroke}
          fill="none"
        />

        {/* Progress */}

        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="#1D7CF2"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
        "
      >
        <span
          className="
            text-lg
            font-semibold
            text-gray-700
          "
        >
          {percentage}%
        </span>
      </div>

    </div>
  );
}