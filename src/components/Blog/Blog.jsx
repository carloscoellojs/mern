import { useSelector } from "react-redux";
import common from "../../lib/common";
import { PageHeader } from "../PageHeader/PageHeader";
import { selectMember } from "../../lib/selectors";

// blog component
const Blog = () => {
  const member = useSelector(selectMember);
  const formattedName = common.firstCharToUpperCase(member?.name);

  if (!common.isLoggedIn()) {
    return null;
  }

  return (
    <div className="blog-container my-5">
      <PageHeader>
        <h2>Blog page</h2>
        <p className="page-sub-header">
          Welcome to your blog <strong>{formattedName}</strong>
        </p>
      </PageHeader>
    </div>
  );
};

export default Blog;
