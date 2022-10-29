import { HomeIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { string } from "zod";

type Post = {
  id: string;
  title: string;
  content: string;
};

type DashboardHomeProps = {
  data: Post[];
};

const DashboardHome = (props: DashboardHomeProps) => {
  const data = props.data || [];

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-gray-200 p-5">
        <HomeIcon className="mr-3 h-6 w-6 text-gray-500" />
        <h1 className="text-gray-900">Home</h1>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-scroll">
        <div>
          {data.map(({ id, title, content }) => (
            <div
              className="divide-y m-10 divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white"
              key={id}
            >
              <div className="flex border-gray-200 bg-white px-4 py-5 sm:px-6">
                <ChatBubbleOvalLeftIcon className="h-6 w-6 mr-3 text-gray-500" />
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </h3>
              </div>
              <p className="p-6">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
