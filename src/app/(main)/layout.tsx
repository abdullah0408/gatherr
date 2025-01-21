import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/common/Navbar";
import MenuBar from "@/components/common/MenuBar";
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="h-screen w-screen m-0 p-0 flex flex-col">
        <Navbar />
        <div className="mx-auto max-w-7xl p-5 flex w-full grow gap-5">
          <MenuBar className="sticky top-[5.25rem] h-fit hidden sm:block space-y-3 rounded-2xl bg-card px-3 py-5 lg:px-5 shadow-sm" />
          {children}
        </div>
        <MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
      </div>
    </AuthProvider>
  );
}
