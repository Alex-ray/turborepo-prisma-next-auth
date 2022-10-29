// Core
import { Fragment } from "react";
import Link from "next/link";

// Components
// import Image from 'next/image';
import { Dialog, Transition } from "@headlessui/react";
import { UserAvatar } from "@components/userProfile";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Utils
import clsx from "clsx";
import PropTypes from "prop-types";

// Config
import navigationConfig from "@components/dashboard/navigationConfig";

type MobileSidebar = {
  username: string;
  open: boolean;
  onClose: (value: boolean) => void;
};

function MobileSidebar(props: MobileSidebar) {
  const { username, open, onClose } = props;

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <h1 className="text-xl font-bold text-gray-700 hover:text-gray-900">
                    <Link href="/app">Kontx.io</Link>
                  </h1>
                </div>
                <nav aria-label="Sidebar" className="mt-5">
                  <div className="space-y-1 px-2">
                    {navigationConfig.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          item.current
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                        )}
                      >
                        <item.icon
                          className={clsx(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-4 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <a href="#" className="group block flex-shrink-0">
                  <div className="flex items-center overflow-hidden">
                    <div>
                      <UserAvatar name={username} />
                      {/* <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                            alt=""
                          /> */}
                    </div>
                    <div className="ml-3 min-w-0">
                      <p className="overflow-hidden text-ellipsis text-base font-medium text-gray-700 group-hover:text-gray-900">
                        {username}
                      </p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

MobileSidebar.propTypes = {
  open: PropTypes.bool,
  username: PropTypes.string,
  onClose: PropTypes.func,
};

MobileSidebar.defaultProps = {
  open: false,
  username: "",
  onClose: () => {
    return null;
  },
};

export default MobileSidebar;
