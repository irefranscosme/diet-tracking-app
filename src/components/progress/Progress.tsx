'use client';

import { useEffect, useState } from 'react';
import { Progress as ShadProgress } from '../ui/progress';

interface ProgressProps {
    isSubmitting: boolean;
    className?: string;
}

const Progress = ({ isSubmitting, className }: ProgressProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let progress = 0;
        const incrementStep = 1;
        const intervalDuration = 50;

        const interval = setInterval(() => {
            progress += incrementStep;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setProgress(100);
            }
            setProgress(Math.round(progress));
        }, intervalDuration);

        return () => {
            clearInterval(interval);
        };
    }, [isSubmitting]);

    return (
        <div>
            {isSubmitting && (
                <ShadProgress
                    value={progress}
                    className={`h-1 my-2 ${className}`}
                />
            )}
        </div>
    );
};
Progress.displayName = 'Progress';

export default Progress;
