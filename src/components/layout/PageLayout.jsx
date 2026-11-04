import Navbar from "./Navbar";
import Footer from "./Footer";

// Shared shell: navbar on top, footer at the bottom, content in between.
export default function PageLayout({ children, footer = true, className = "bg-slate-50" }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 ${className}`}>{children}</main>
      {footer && <Footer />}
    </div>
  );
}
