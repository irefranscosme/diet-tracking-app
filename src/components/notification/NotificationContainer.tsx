import { Bell } from 'lucide-react';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

// TODO: FOR FUTURE USE NO EXPERIENCE WITH NOTIFICATION

const notifications = [
    {
        id: 1,
        title: 'Coach John Doe accepted your offer.',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
    {
        id: 2,
        title: 'Coach Jane Doe declined your offer.',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
];

const NotificationContainer = () => {
    return (
        <div className="flex items-center justify-center">
            {/* <Button variant={'ghost'} className="p-2"></Button> */}
            <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                    <Bell className="w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.map((notif, index) => (
                        <DropdownMenuItem
                            key={index}
                            className="cursor-pointer"
                        >
                            <div className="max-w-64 space-y-1">
                                <h2 className="font-bold text-md">
                                    {notif.title}
                                </h2>
                                <p className="max-h-12 truncate text-ellipsis break-all">
                                    {notif.description}
                                </p>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default NotificationContainer;
