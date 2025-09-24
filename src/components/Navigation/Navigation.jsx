import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logUserOutAction } from "../../actions/userActions";
import { selectAll } from "../../lib/selectors";


const NAV_LINKS = {
  authenticated: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Blog", to: "/blog" },
    { label: "Logout", to: "/", isLogout: true }
  ],
  unauthenticated: [
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" }
  ]
};

const Navigation = () => {
  const { isUserAuthenticated } = useSelector(selectAll);
  const dispatch = useDispatch();

  const links = isUserAuthenticated ? NAV_LINKS.authenticated : NAV_LINKS.unauthenticated;

  const handleNavClick = (link) => {
    if (link.isLogout) {
      dispatch(logUserOutAction());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <nav className="flex items-center justify-between py-6 border-b border-indigo-100 mb-8">
          <div className="flex items-center space-x-6">
            {!isUserAuthenticated && (
              <NavLink className="text-2xl text-charcoal hover:text-charcoal-light transition-colors" to="/">
                Home
              </NavLink>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {links.map((link) => (
              <NavLink
                key={link.label}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors duration-200 ` +
                  (isActive
                    ? "bg-wheat shadow"
                    : "hover:bg-wheat hover:text-charcoal-light")
                }
                to={link.to}
                onClick={link.isLogout ? () => handleNavClick(link) : undefined}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="bg-white rounded-xl shadow-md p-6 min-h-[60vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
