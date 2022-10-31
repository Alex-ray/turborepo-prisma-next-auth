import Image from "next/future/image";

import { CheckIcon } from "@heroicons/react/20/solid";

import backgroundImage from "@public/background-auth.jpg";

const VerifyLogin = (): JSX.Element => {
  return (
    <>
      <div className="absolute flex justify-center items-center inset-0 md:px-12 lg:px-0">
        <div className="relative transform z-10 overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckIcon
                className="h-6 w-6 text-green-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Sign in link sent!
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Check your email and click on the link to start using our app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contents">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={backgroundImage}
          alt=""
          unoptimized
        />
      </div>
    </>
  );
};

export default VerifyLogin;
