'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { ScanLine } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import Image from 'next/image';
import { off } from 'process';

const Scanner = () => {
    const [isCaptured, setIsCaptured] = useState<boolean>(false);
    const [hasCameraError, setHasCameraError] = useState<boolean>(false);
    const [isCameraLoading, setIsCameraLoading] = useState<boolean>(true);
    const [imageUrl, setImageUrl] = useState<string>('');
    const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const initializeMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            if (videoPlayerRef.current) {
                console.log(
                    '🚀 ~ initializeMedia ~ videoPlayerRef.current:',
                    videoPlayerRef.current,
                );
                videoPlayerRef.current.srcObject = stream;
                setIsCameraLoading(true);
            } else {
                throw new Error('Failed to get video stream');
            }
        } catch (e) {
            console.error('Error accessing camera:', e);
            setHasCameraError(true);
        }
    };

    console.log(isCaptured);

    const handleSaveImage = async () => {
        setIsCaptured(true);
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (canvas && context && videoPlayerRef.current) {
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';
            canvas.width = videoPlayerRef?.current.videoWidth;
            canvas.height = videoPlayerRef?.current.videoHeight;
        }

        if (videoPlayerRef.current) {
            const videoPlayer = videoPlayerRef.current;

            context?.drawImage(
                videoPlayerRef.current,
                0,
                0,
                canvas?.width || 0,
                canvas?.height || 0,
            );

            const imageDataUrl = canvas?.toDataURL('image/png');

            if (imageDataUrl) {
                setImageUrl(imageDataUrl);
                setIsCaptured(false);
                console.log(imageDataUrl);

                (videoPlayer.srcObject as MediaStream)
                    .getVideoTracks()
                    .map((track) => track.stop());
                // videoPlayerRef.current.style.display = 'none';
            }
        }
    };

    const handleCapture = async () => {
        try {
            await handleSaveImage();
        } catch (e) {
            console.error('Error saving image', e);
        }
    };

    const handleOpenCamera = async () => {
        try {
            await initializeMedia();
        } catch (e) {
            console.error('Error initializing camera', e);
            if (videoPlayerRef.current && videoPlayerRef.current.srcObject) {
                const stream = videoPlayerRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop()); // Stop the media tracks
            }
        }
    };

    const handleClearImage = async () => {
        await initializeMedia();
        setImageUrl('');
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button type="button" onClick={handleOpenCamera}>
                        <div className="flex flex-row gap-2 items-center pointer-events-none">
                            <ScanLine />
                            <p>Scan</p>
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Scan your meal.</DialogTitle>
                        <DialogDescription>
                            You can track your macros by scanning your meal.
                            Separation of meal content is a must for accuracy.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        {hasCameraError ? (
                            <p>
                                Error accessing the camera. Please check your
                                permissions.
                            </p>
                        ) : (
                            <video
                                ref={videoPlayerRef}
                                autoPlay
                                playsInline
                                className={`w-full h-auto rounded-md ${
                                    imageUrl && 'hidden'
                                } `}
                            />
                        )}

                        <div className="relative">
                            {isCaptured && (
                                <div className="absolute inset-0 bg-white  opacity-50 animate-bounce" />
                            )}
                            <canvas
                                id="canvas"
                                ref={canvasRef}
                                // className="hidden"
                                className={`w-full h-full rounded-md border  ${
                                    imageUrl ? 'border-red-500' : 'hidden'
                                }`}
                            />
                        </div>
                        <Button
                            id="capture"
                            variant={imageUrl ? 'outline' : 'default'}
                            onClick={
                                imageUrl ? handleClearImage : handleCapture
                            }
                        >
                            {imageUrl ? 'Clear Image' : 'Track'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Scanner;
