import clsx from "clsx";

// Config
import navigationConfig from "@components/dashboard/navigationConfig";

const SidebarMainNavigation = () => (
  <nav className="mt-5 flex-1" aria-label="Sidebar">
    <div className="space-y-1 px-2">
      {navigationConfig.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={clsx(
            item.current
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
          )}
        >
          <item.icon
            className={clsx(
              item.current
                ? "text-gray-500"
                : "text-gray-400 group-hover:text-gray-500",
              "mr-3 h-6 w-6"
            )}
            aria-hidden="true"
          />
          {item.name}
        </a>
      ))}
    </div>
  </nav>
);

export default SidebarMainNavigation;
