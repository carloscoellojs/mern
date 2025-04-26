import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PageHeader } from "../PageHeader/PageHeader";
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
    <div className="blog-container my-5">
      <PageHeader>
        <h2>Home Page</h2>
        <p className="lead my-5">
          Go to <Link to={'/register'} className="text-indigo-700 hover:opacity-60">Register Page</Link> to create an account and start creating your blog page
        </p>
      </PageHeader>
    </div>
  );
};

export default HomePage;
