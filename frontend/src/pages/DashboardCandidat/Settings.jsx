import { Bookmark } from "lucide-react";
import Navbar from "../../components/dashboardCandidat/Navbar";
import Sidebar from "../../components/dashboardCandidat/Sidebar";
import Footer from "../../components/dashboardCandidat/Footer";

export default function Settings() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar isOpen={true} />
      </div>
      <Footer />
    </div>
  );
}
