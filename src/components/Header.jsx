import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import { dashboardContext } from "../context";

const Header = () => {
  const { userData } = dashboardContext(); // Add isLoading from your context

  return (
    <header className="w-full">
      <div className="bg-gray-800 h-15 flex justify-between items-center p-4 px-6 md:px-20 xl:px-40">
        <h3 className="font-bold text-white text-2xl">
          <Link to="/">Swift</Link>
        </h3>
        <div className="flex items-center">
          {userData === null ? (
            <Skeleton
              avatar
              paragraph={{ rows: 0 }}
              active
              size="large"
              style={{ width: 160 }}
            />
          ) : (
            <Link to="/profile" className="flex items-center">
              <span className="rounded-full bg-white w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-800">
                {userData.name?.charAt(0) || "U"}
              </span>
              <span className="ml-2 text-sm font-normal text-white">
                {userData.name || "User"}
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
