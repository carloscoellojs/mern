// connect helps react communicate with redux and viceversa
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserAction } from "../../actions/userActions";
import common from "../../lib/common";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { selectMember } from "../../lib/selectors";
import { Spinner } from "../../components/Spinner/Spinner";

// component for representing our dashboard
const Dashboard = () => {
  const member = useSelector(selectMember);
  const dispatch = useDispatch();
  const formattedName = common.firstCharToUpperCase(member?.name);


  useEffect(() => {
    common.delayForDemo(2000).then(() => dispatch(fetchUserAction(localStorage.getItem("id"))));
  }, []);

  if(!member.name){
    return <Spinner message="Dashboard is loading..." />
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-white">
      <div className="dashboard-container w-full max-w-xl mt-10">
        {member.name ? (
          <div className="my-5">
            <PageHeader>
              <h2 className="text-2xl">Dashboard Page</h2>
              <p className="page-sub-header">
                Welcome to your dashboard <strong>{formattedName}</strong> find account information below:
              </p>
            </PageHeader>
            <ul className="list-group mt-6 space-y-2">
              <li className="bg-gray-50 rounded p-3 border border-gray-200">
                <strong>name: </strong>
                {formattedName}
              </li>
              <li className="bg-gray-50 rounded p-3 border border-gray-200">
                <strong>email: </strong>
                {member?.email}
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;