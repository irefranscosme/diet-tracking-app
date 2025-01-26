'use client';

import { useEffect, useState } from 'react';
import { Progress } from '../ui/progress';

interface ProductProgressProps {
    isSubmitting: boolean;
}

const ProductProgress = ({ isSubmitting }: ProductProgressProps) => {
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
            console.log('clear internval');
        };
    }, [isSubmitting]);

    return (
        <div>
            {isSubmitting && <Progress value={progress} className="h-1 my-2" />}
        </div>
    );
};
ProductProgress.displayName = 'ProductProgress';

export default ProductProgress;
