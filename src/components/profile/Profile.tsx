import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { createSupabaseServer } from '@/utils/supabase/server';
import Logout from '../auth/Logout';

const Profile = async () => {
    const supabase = await createSupabaseServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="flex items-center justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                    <Avatar className="w-7 h-7">
                        <AvatarImage src={user?.user_metadata.avatar_url} />
                        <AvatarFallback>
                            {user?.user_metadata.name}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Profile</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                        Settings
                    </DropdownMenuItem>
                    <Logout />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Profile;
