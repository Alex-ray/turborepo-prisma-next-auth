import Link from "next/link";

// Components
import { UserAvatar } from "@components/userProfile";

type UserProfilePopover = {
  username: string;
  onSignOut: () => void;
};

const UserProfilePopover = (props: UserProfilePopover) => {
  const { username, onSignOut: handleSignOut } = props;

  return (
    <div className="ml-4 mb-8 overflow-hidden rounded-lg bg-white shadow">
      <p className="flex items-center justify-center overflow-hidden text-ellipsis border-b border-gray-200 p-3 text-base font-medium text-gray-700 group-hover:text-gray-900">
        <UserAvatar name={username} />
        {/* <img
                                    className="inline-block h-10 w-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                                    alt=""
                                  /> */}
        <div className="p-3 text-sm">{username}</div>
      </p>
      <div>
        <div className="group flex flex-col items-start justify-start p-2">
          <div className="mb-1 grow rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <Link href="/settings">Settings</Link>
          </div>
          <div className="mb-1 grow rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <a href="#" onClick={handleSignOut}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePopover;
