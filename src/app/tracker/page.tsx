import Category from '@/components/categories/Category';

// TODO: improve metadata
export const metadata = {
    title: 'Tracker - Diet Tracking App',
    description: 'Tracker - Diet Tracking App Descripition',
};

export default function Page() {
    return (
        <main className="basis-full p-5">
            <Category />
        </main>
    );
}
