import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const GoogleAvatar = ({ className }: { className: string }) => {
    return (
        <Avatar className={`${className}`}>
            <AvatarImage src="/icons/google/Google_Symbol_0.svg" />
            <AvatarFallback>Google</AvatarFallback>
        </Avatar>
    );
};

export default GoogleAvatar;
