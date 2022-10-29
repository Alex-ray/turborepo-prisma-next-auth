// Components
import UserProfileNav from "./userProfileNav";
import SidebarHeader from "./sidebarHeader";
import SidebarMainNavigation from "./sidebarMainNavigation";

// Utils
import PropTypes from "prop-types";

type DesktopSidebar = {
  username: string;
};

const DesktopSidebar = (props: DesktopSidebar) => {
  const { username } = props;

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex w-64 flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <SidebarHeader />
            <SidebarMainNavigation />
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <UserProfileNav username={username} />
          </div>
        </div>
      </div>
    </div>
  );
};

DesktopSidebar.propTypes = {
  username: PropTypes.string,
};

DesktopSidebar.defaultProps = {
  username: "",
};

export default DesktopSidebar;
