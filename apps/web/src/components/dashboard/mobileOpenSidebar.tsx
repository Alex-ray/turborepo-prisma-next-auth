import { Bars3Icon } from "@heroicons/react/24/outline";

type MobileOpenSidebar = {
  onClick: () => void;
};

const MobileOpenSidebar = (props: MobileOpenSidebar) => {
  const { onClick } = props;

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
        <div>
          <button
            type="button"
            className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={onClick}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileOpenSidebar;
