import { FC, useEffect, useState } from "react";

type Props = {
    endValue: number;
    duration: number;
}

const CountUpNumber: FC<Props> = ({ endValue, duration }) => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime

        if (progress < duration) {
            setCount(Math.min(endValue, (progress / duration) * endValue));
            animationFrameId = requestAnimationFrame(updateCount);
        } else {
            setCount(endValue);
        }
    };

    animationFrameId = requestAnimationFrame(updateCount);
  }, [endValue, duration]);

  return (
    <section>CountUpNumber</section>
  );
};

export default CountUpNumber