import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/common/Navbar";
export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <AuthProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="max-w-7xl mx-auto p-5">{children}</div>
        </div>
      </AuthProvider>

    );
  }
  