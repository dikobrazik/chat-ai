import { useEffect, useState } from "react";

export type WaitingStage = "checking" | "slow" | "stuck";

export const useWaitingStage = (isWaiting: boolean) => {
  const [stage, setStage] = useState<WaitingStage>("checking");

  useEffect(() => {
    if (!isWaiting) {
      return;
    }

    const timers = [
      setTimeout(() => setStage("slow"), 10 * 1000),
      setTimeout(() => setStage("stuck"), 150 * 1000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isWaiting]);

  return stage;
};
