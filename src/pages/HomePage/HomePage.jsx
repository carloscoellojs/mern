import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import common from "../../lib/common";

// home page component
const HomePage = () => {
const navigate = useNavigate();

   // lifecylce method typically used to make requests and setState
    useEffect(() => {
      const isLoggedIn = common.isLoggedIn();
      if (isLoggedIn) {
        navigate("/dashboard", { replace: true });
      }
    }, []);

  return (
    <div className="min-h-screen flex items-start justify-center">
      <div className="w-full max-w-2xl p-10 text-center">
        <PageHeader>
          <h2 className="text-2xl text-charcoal-light mb-4">Welcome to the Blog Platform</h2>
          <p className="text-gray-700 mb-8">
            Go to{' '}
            <Link to={'/register'} className="text-indigo-700 font-semibold underline hover:opacity-70 transition">
              Register Page
            </Link>{' '}
            to create an account and start creating your blog page.
          </p>
        </PageHeader>
        <div className="flex justify-center gap-4 mt-6">
          <Link to="/login" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition">Login</Link>
          <Link to="/register" className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium shadow hover:bg-gray-700 transition">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
