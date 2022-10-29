// Libraries
import clsx from "clsx";

// Components
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  CalendarIcon,
} from "@heroicons/react/20/solid";

const AgendaControlsHeader = () => (
  <div>
    <div className="flex flex-row items-center p-5">
      <div className="flex cursor-pointer items-center hover:text-blue-700">
        <span className="text-sm font-medium">Sep 20, Thu</span>
        <span>
          <ChevronDownIcon className="ml-1.5 mr-4 h-4 w-4" />
        </span>
      </div>
      <ChevronLeftIcon className="block h-6 w-6 cursor-pointer rounded-sm p-0.5 hover:bg-gray-300" />
      <ChevronRightIcon className="ml-2 block h-6 w-6 cursor-pointer rounded-sm p-0.5 hover:bg-gray-300" />
      <div className="ml-3 cursor-pointer rounded-sm px-2 py-1 text-xs font-medium hover:bg-gray-300">
        Today
      </div>
      <div className="ml-auto cursor-pointer rounded-sm px-1 py-0.5 hover:bg-gray-300">
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </div>
    </div>
    <div className="flex h-10 items-stretch border-b-2 border-white font-medium">
      <div className="flex w-1/4 items-center justify-center border-r border-white text-center text-xs">
        <div>All day</div>
      </div>
    </div>
  </div>
);

type AgendaHour = {
  hour: number;
  postfix: string;
  isFirst: boolean;
  isLast: boolean;
};

const AgendaHour = ({ hour, postfix, isFirst, isLast }: AgendaHour) => (
  <div key={`${hour}-am`} className="flex h-16 items-stretch">
    <div
      className={clsx("flex w-1/4 items-center justify-items-stretch text-sm", {
        "border-r border-white": !isLast,
      })}
    >
      <div
        className={clsx("m-auto text-xs font-medium", {
          "-mt-2": !isFirst,
          "mt-1": isFirst,
        })}
      >
        {hour}
        {postfix}
      </div>
    </div>
    <div
      className={clsx("w-3/4", {
        "border-t border-white": !isFirst,
      })}
    />
  </div>
);

const AgendaDay = () => {
  const dayHoursAm = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const dayHoursPm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto">
      <div>
        {dayHoursAm.map((hour, index) => (
          <AgendaHour
            key={`am-${hour}`}
            hour={hour}
            postfix={"am"}
            isFirst={index === 0}
            isLast={false}
          />
        ))}
        {dayHoursPm.map((hour, index) => (
          <AgendaHour
            key={`am-${hour}`}
            hour={hour}
            postfix={"pm"}
            isFirst={false}
            isLast={index === dayHoursPm.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

const DashboardAgenda = () => {
  return (
    <>
      <div className="flex items-center border-b border-gray-200 p-5">
        <CalendarIcon className="mr-3 h-6 w-6 text-gray-500" />
        <h2 className="text-gray-900">Daily Agenda</h2>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-auto p-5">
        <div className="flex min-h-0 flex-1 flex-col overflow-auto rounded-md bg-gray-200 text-gray-600">
          <AgendaControlsHeader />
          <AgendaDay />
        </div>
      </div>
    </>
  );
};

export default DashboardAgenda;
