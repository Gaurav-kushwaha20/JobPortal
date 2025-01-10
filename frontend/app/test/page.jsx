"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserProfile({ children }) {
    const router = useRouter();
    const activeTab = router.pathname.split("/").pop();

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white"
                        />
                        <div className="text-white">
                            <h1 className="text-2xl font-bold">John Doe</h1>
                            <p className="text-sm opacity-80">johndoe@example.com</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-200">
                    {["overview", "posts", "settings"].map((tab) => (
                        <Link key={tab} href={`/profile/${tab}`}>
                            <a
                                className={`flex-1 py-3 text-center font-medium ${
                                    activeTab === tab
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </a>
                        </Link>
                    ))}
                </div>

                {/* Content Section */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
