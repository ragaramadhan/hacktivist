export default function Loading({ small }: { small?: boolean }) {
    return (
        <div className={`${!small ? 'pt-24 min-h-screen' : ''} bg-white flex items-center justify-center`}>
            <div className={`animate-spin rounded-full ${small ? 'h-8 w-8' : 'h-12 w-12'} border-t-2 border-b-2 border-gray-900`}></div>
        </div>
    )
}