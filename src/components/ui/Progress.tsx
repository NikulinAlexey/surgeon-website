import { cn } from "@/lib/clsx";

interface ProgressProps {
  stepsLenght: number;
  currentStep: number;
}
export default function Progress({ stepsLenght, currentStep }: ProgressProps) {
  const currentPercent = (currentStep / stepsLenght) * 100;
  return (
    <div
      className={cn("progress", {
        _running: currentStep > 0 && currentStep < stepsLenght,
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
