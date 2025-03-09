'use client';

import { useReducer, useRef, useState } from 'react';
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

type Macro = {
    calories: string | number | null;
    protein: string | number | null;
    carbohydrates: {
        total: string | number | null;
        fiber: string | number | null;
        sugars: string | number | null;
    };
    fat: {
        total: string | number | null;
        saturated: string | number | null;
        trans: string | number | null;
    };
    sodium: string | number | null;
    cholesterol: string | number | null;
    serving_size: string | number;
    ingredients: string[];
    explanation: string;
};

interface State {
    explanation: string | null;
    macro: Macro | null;
}

type Action = { type: 'SET_RESPONSE'; payload: State };

const initialState: State = {
    explanation: null,
    macro: null,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_RESPONSE':
            return {
                ...state,
                explanation: action.payload.explanation,
                macro: action.payload.macro,
            };
        default:
            return state;
    }
};

const Scanner = () => {
    const [isCaptured, setIsCaptured] = useState<boolean>(false);
    const [hasCameraError, setHasCameraError] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    const initializeMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: {
                        min: 1280,
                        ideal: 1920,
                        max: 2560,
                    },
                    height: {
                        min: 720,
                        ideal: 1080,
                        max: 1440,
                    },
                    facingMode: 'environment',
                },
                audio: false,
            });
            if (videoPlayerRef.current) {
                videoPlayerRef.current.srcObject = stream;
                console.log('🚀 ~ initializeMedia ~ stream:', stream);
            } else {
                throw new Error('Failed to get video stream');
            }
        } catch (e) {
            console.error('Error accessing camera:', e);
            setHasCameraError(true);
        }
    };

    const handleSaveImage = async (): Promise<string | undefined> => {
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

                return imageDataUrl;
            }
        }
    };

    const handleCapture = async () => {
        try {
            const imageUrl = await handleSaveImage();

            if (imageUrl) {
                const formData = new FormData();
                formData.append('imageUrl', imageUrl);
                const response = await fetch('/api/tracker', {
                    method: 'POST',
                    body: formData,
                });

                // Handle response if necessary
                const data = await response.json();

                const text = data.message.content;

                const jsonPart = text.match(/```json\s([\s\S]*?)```/);

                // Parse the JSON part into an object if it exists
                let jsonObject: Macro | null = null;

                if (jsonPart) {
                    if (jsonPart && jsonPart[1]) {
                        try {
                            jsonObject = JSON.parse(jsonPart[1]);
                        } catch (e) {
                            console.error('Error parsing JSON:', e);
                        }
                    }
                } else {
                    // If no JSON block is found, return the whole text
                    jsonObject = JSON.parse(text);
                }

                dispatch({
                    type: 'SET_RESPONSE',
                    payload: {
                        explanation: jsonObject?.explanation || '',
                        macro: jsonObject,
                    },
                });
            } else {
                throw new Error('Failed to save image');
            }
        } catch (e) {
            console.error('Error saving image', e);
        }
    };

    const handleClearImage = async () => {
        await initializeMedia();
        setImageUrl('');
        dispatch({
            type: 'SET_RESPONSE',
            payload: initialState,
        });
    };
    const [dialog, setDialog] = useState<boolean>(false);

    const handleClose = () => {
        setImageUrl('');
        dispatch({
            type: 'SET_RESPONSE',
            payload: initialState,
        });
        setDialog(false);
    };

    const handleOpen = async () => {
        setDialog(true);
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

    return (
        <div>
            <Dialog
                open={dialog}
                onOpenChange={(open) => !open && handleClose()}
            >
                <DialogTrigger asChild>
                    <Button type="button" onClick={() => handleOpen()}>
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

                        <div className="relative flex flex-col gap-2">
                            {isCaptured && (
                                <div className="absolute inset-0 bg-white  opacity-50 animate-bounce" />
                            )}
                            <canvas
                                id="canvas"
                                ref={canvasRef}
                                // className="hidden"
                                className={`w-full h-full rounded-md border  ${
                                    imageUrl ? 'border-black' : 'hidden'
                                }`}
                            />
                            <div className="max-h-80 overflow-y-auto">
                                <article className="flex flex-col gap-2">
                                    {state.explanation && (
                                        <p>{state.explanation}</p>
                                    )}
                                    {state.macro && (
                                        <ul>
                                            <li>
                                                Calories:{' '}
                                                <span>
                                                    {state.macro?.calories || 0}
                                                </span>
                                            </li>
                                            <li>
                                                Protein:{' '}
                                                <span>
                                                    {state.macro?.protein || 0}
                                                </span>
                                            </li>
                                            <li>
                                                Carbohydrates:{' '}
                                                <span>
                                                    {state.macro?.carbohydrates
                                                        .total || 0}
                                                </span>
                                                <ul>
                                                    <li>
                                                        Fiber:{' '}
                                                        <span>
                                                            {
                                                                state.macro
                                                                    ?.carbohydrates
                                                                    .fiber
                                                            }
                                                        </span>
                                                    </li>
                                                    <li>
                                                        Sugars:{' '}
                                                        <span>
                                                            {
                                                                state.macro
                                                                    ?.carbohydrates
                                                                    .sugars
                                                            }
                                                        </span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                Fats:{' '}
                                                <span>
                                                    {state.macro?.fat.total ||
                                                        0}
                                                </span>
                                                <ul>
                                                    <li>
                                                        Saturated:{' '}
                                                        <span>
                                                            {state.macro?.fat
                                                                .saturated || 0}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        Trans:{' '}
                                                        <span>
                                                            {state.macro?.fat
                                                                .trans || 0}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                Sodium:{' '}
                                                <span>
                                                    {state.macro?.sodium || 0}
                                                </span>
                                            </li>
                                            <li>
                                                Cholesterol:{' '}
                                                <span>
                                                    {state.macro?.cholesterol ||
                                                        0}
                                                </span>
                                            </li>
                                            <li>
                                                Serving Size:{' '}
                                                <span>
                                                    {state.macro
                                                        ?.serving_size || 0}
                                                </span>
                                            </li>
                                            <li>
                                                Ingredients:{' '}
                                                <span>
                                                    {state.macro?.ingredients.join(
                                                        ', ',
                                                    ) || 'N/A'}
                                                </span>
                                            </li>
                                        </ul>
                                    )}
                                </article>
                            </div>
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
