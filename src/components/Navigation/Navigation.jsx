import { NavLink, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logUserOutAction } from "../../actions/userActions";
import { selectAll } from "../../lib/selectors";

// component for our main navigation
const Navigation = () => {
  const { isUserAuthenticated } = useSelector(selectAll);
  const dispatch = useDispatch();

  const AUTHENTICATED_NAV_LINKS = [
    ["Dashboard", { to: "/dashboard" }],
    ["Blog", { to: "/blog" }],
    ["Logout", { onClick: () => dispatch(logUserOutAction()), to: "/" }]
  ];

  const UN_AUTHENTICATED_NAV_LINKS = [
    ["Login", { to: "/login" }],
    ["Register", { to: "/register" }]
  ];

  const createNavLinks = (linkMapping) =>
    linkMapping.map((link) => (
      <div key={link[0]}>
        <NavLink
          className={'mx-4 hover:text-indigo-500'}
          {...link[1]}
        >
          {link[0]}
        </NavLink>
      </div>
    ));


  return (
    <div className="main-container">
      <div className="wrapper-container">
        <nav className="nav-container">
          {
         !isUserAuthenticated ? <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          : <div></div>}
          <div className="flex flex-row">
            {createNavLinks(isUserAuthenticated ? AUTHENTICATED_NAV_LINKS : UN_AUTHENTICATED_NAV_LINKS)}
          </div>
        </nav>
        <div className="main-outer-page-container ">
          <div className="main-inner-page-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
