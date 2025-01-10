export default function profile({ children }) {
    return (
        <div>
            <p>profile route group</p>
            <main className="p-6">{children}</main>
        </div>
    );
}
