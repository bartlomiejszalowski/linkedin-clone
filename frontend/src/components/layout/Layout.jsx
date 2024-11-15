import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-100 overflow-hidden">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6  overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
