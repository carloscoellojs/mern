import { useSelector } from "react-redux";
import common from "../../lib/common";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { selectMember } from "../../lib/selectors";

// blog component
const Blog = () => {
  const member = useSelector(selectMember);
  const formattedName = common.firstCharToUpperCase(member?.name);

  return (
    <div className="min-h-screen flex items-start justify-center bg-white">
      <div className="blog-container w-full max-w-xl mt-10">
        <PageHeader>
          <h2 className="text-2xl">Blog page</h2>
          <p className="page-sub-header">
            Welcome to your blog <strong>{formattedName}</strong>
          </p>
        </PageHeader>
      </div>
    </div>
  );
};

export default Blog;
