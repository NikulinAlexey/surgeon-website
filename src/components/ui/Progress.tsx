import { cn } from "@/lib/clsx";

interface ProgressProps {
  stepsLenght: number;
  currentStep: number;
  className?: string;
  noLabel?: boolean;
}
export default function Progress({
  stepsLenght,
  currentStep,
  className,
  noLabel,
}: ProgressProps) {
  const currentPercent = (currentStep / stepsLenght) * 100;
  const isProgressRunning = currentStep > 0 && currentStep < stepsLenght;
  return (
    <div
      className={cn(className, "progress", {
        _running: isProgressRunning,
      })}
    >
      <label className="progress__label">
        {!noLabel && (
          <span className="progress__text">
            Шаг {currentStep} из {stepsLenght}
          </span>
        )}
        <progress
          max="100"
          aria-label={"Прогресс выполнения"}
          className="progress__result"
          value={currentPercent}
        >
          {currentPercent}%
        </progress>
      </label>
    </div>
  );
}
