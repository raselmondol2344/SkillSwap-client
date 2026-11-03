import DashbordAsidebar from "../component/DashbordAsidebar";
import DashbordNavbar from "../component/DashbordNavbar";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <DashbordAsidebar />

        {/* Main Content */}
        <main className="min-w-0 flex-1">

          {/* Navbar */}
          <DashbordNavbar />

          {/* Page Content */}
          <section className="w-full p-3 sm:p-4 md:p-6">
            {children}
          </section>

        </main>
      </div>
    </div>
  );
}