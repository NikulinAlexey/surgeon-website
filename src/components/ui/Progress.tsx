import { cn } from "@/lib/clsx";

interface ProgressProps {
  stepsLenght: number;
  currentStep: number;
  className?: string;
}
export default function Progress({
  stepsLenght,
  currentStep,
  className,
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
        Шаг {currentStep} из {stepsLenght}
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
