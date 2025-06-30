import { useState } from 'react';
import { Lock } from "lucide-react";
import Navbar from "../../../components/dashboardCandidat/Navbar";
import Sidebar from "../../../components/dashboardCandidat/Sidebar";
import Footer from "../../../components/dashboardCandidat/Footer";
import toast from 'react-hot-toast';

export default function Settings() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    // In a real application, you would dispatch an action to an API here
    // For demonstration, we'll simulate an API call
    console.log("Changing password with data:", {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Assuming success:
      toast.success("Password updated successfully!");
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

    } catch (error) {
      // Handle potential API errors
      toast.error("Failed to update password. Please check your current password.");
      console.error("Password update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar isOpen={true} />
        <main className="flex-1 p-6 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Change Password</h2>
                <p className="text-gray-600 dark:text-gray-300">Update your password for enhanced security.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md w-full sm:w-auto disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}