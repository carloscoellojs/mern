// connect helps react communicate with redux and viceversa
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserAction } from "../../actions/userActions";
import common from "../../lib/common";
import { Loader } from "../Loader/Loader";
import { PageHeader } from "../PageHeader/PageHeader";
import { selectMember } from "../../lib/selectors";

// component for representing our dashboard
const Dashboard = () => {
  const member = useSelector(selectMember);
  const dispatch = useDispatch();
  const formattedName = common.firstCharToUpperCase(member?.name);

  useEffect(() => {
    dispatch(fetchUserAction(localStorage.getItem("id")));
  }, []);

  if (!common.isLoggedIn()) {
    return null;
  }

  return (
      <div className="dashboard-container">
        {member.name ? (
          <div className="my-5">
        <PageHeader>
            <h2>Dashboard Page</h2>
          <p className="page-sub-header">
            Welcome to your dashboard <strong>{formattedName}</strong> find account information below:
          </p>
        </PageHeader>
        <ul className="list-group">
          <li>
            <strong>name: </strong>
            {formattedName}
          </li>
          <li>
            <strong>email: </strong>
            {member?.email}
          </li>
        </ul>
        </div>
        ): <Loader />}
      </div>
  );
};

export default Dashboard;
