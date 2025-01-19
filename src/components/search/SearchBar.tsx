import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
    placeholder: string;
}

export function SearchBar({ placeholder }: SearchBarProps) {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <div className="relative isolate">
                <div className="absolute px-2 h-full left-0 flex items-center justify-center">
                    <SearchIcon size={21} />
                </div>
                <Input
                    type="email"
                    placeholder={placeholder}
                    className="pl-8"
                />
            </div>
        </div>
    );
}
