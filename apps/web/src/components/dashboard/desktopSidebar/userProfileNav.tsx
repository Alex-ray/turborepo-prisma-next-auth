// Libs
import { useState } from "react";

// Components
import { UserAvatar } from "@components/userProfile";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import UserProfilePopover from "./userProfilePopover";

// Hooks
import { usePopper } from "react-popper";
import useSignOut from "@hooks/useSignOut";

type UserProfileNav = {
  username: string;
};

const UserProfileNav = (props: UserProfileNav) => {
  const { username } = props;

  const { signOut: handleSignOut } = useSignOut();
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <Popover className="flex overflow-hidden">
      {({ open }) => (
        <>
          <Popover.Button
            as="div"
            ref={setReferenceElement}
            className="relative overflow-hidden"
          >
            {/* <a href="#" className="group block w-full flex-shrink-0"> */}
            <a
              href="#"
              className="group block flex w-full min-w-0 flex-shrink-0 items-center"
            >
              <div>
                <UserAvatar name={username} />
                {/* <img
                                    className="inline-block h-10 w-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                                    alt=""
                                  /> */}
              </div>
              <div className="ml-3 min-w-0">
                <p className="overflow-hidden	text-ellipsis text-base font-medium text-gray-700 group-hover:text-gray-900">
                  {username}
                </p>
                <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  View profile
                </p>
              </div>
              <div className="ml-1 w-12">
                <ChevronDownIcon
                  className={open ? "rotate-180 transform" : ""}
                />
              </div>
            </a>
            {/* </a> */}
          </Popover.Button>
          {/* <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          > */}
          <Popover.Panel
            className="z-10"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <UserProfilePopover username={username} onSignOut={handleSignOut} />
          </Popover.Panel>
          {/* </Transition> */}
        </>
      )}
    </Popover>
  );
};

export default UserProfileNav;
