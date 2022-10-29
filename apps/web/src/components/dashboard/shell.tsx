// Components
import MobileSidebar from "@components/dashboard/mobileSidebar";
import DesktopSidebar from "@components/dashboard/desktopSidebar";
import MobileOpenSidebar from "@components/dashboard/mobileOpenSidebar";

// Hooks
import useOpenClose from "@hooks/useOpenClose";

type SecondaryColumn = {
  children?: React.ReactNode;
};

type MainColumn = {
  children?: React.ReactNode;
};

type Columns = {
  columns: React.ReactElement[];
};

type DashboardShell = {
  name: string;
  columns: React.ReactElement[];
};

const SecondaryColumn = (props: SecondaryColumn) => {
  const { children } = props;
  return (
    <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-l border-gray-200 xl:flex xl:flex-col">
      {/* Start secondary column (hidden on smaller screens) */}
      <div className="flex flex-col flex-1 overflow-auto min-h-0">
        {children || (
          <div className="mx-4 my-6 h-full rounded-lg border-2 border-dashed border-gray-200 sm:mx-6 lg:mx-8" />
        )}
      </div>
      {/* End secondary column */}
    </aside>
  );
};

const MainColumn = (props: MainColumn) => {
  const { children } = props;
  return (
    <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
      {/* Start main area*/}
      <div className="absolute inset-0">
        {children || (
          <div className="mx-4 my-6 h-full rounded-lg border-2 border-dashed border-gray-200 sm:mx-6 lg:mx-8" />
        )}
      </div>
      {/* End main area */}
    </main>
  );
};

const Columns = (props: Columns) => {
  const { columns } = props;
  const supportedColumns = [MainColumn, SecondaryColumn];

  const columnsToRender = columns.map((column, index) => {
    const ELWrapper = supportedColumns[index];
    const ElToRender = column;

    return (
      (ELWrapper && ElToRender && (
        <ELWrapper key={`columns-to-render-${index}`}>
          <>{ElToRender}</>
        </ELWrapper>
      )) ||
      null
    );
  });

  return <>{columnsToRender}</>;
};

function DashboardShell(props: DashboardShell) {
  const { name, columns } = props;
  const {
    open: sidebarOpen,
    onClose: handleSidebarClose,
    onOpen: handleSidebarOpen,
  } = useOpenClose();

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full overflow-hidden">
        ```
      */}
      <div className="flex h-full">
        <MobileSidebar
          username={name}
          open={sidebarOpen}
          onClose={handleSidebarClose}
        />
        <DesktopSidebar username={name} />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <MobileOpenSidebar onClick={handleSidebarOpen} />

          <div className="relative z-0 flex flex-1 overflow-hidden">
            <Columns columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}

DashboardShell.defaultProps = {
  name: "",
  columns: [],
};

export default DashboardShell;
