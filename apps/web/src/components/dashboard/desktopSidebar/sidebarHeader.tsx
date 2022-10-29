import Link from "next/link";

const SidebarHeader = () => (
  <div className="flex flex-shrink-0 items-center px-4">
    {/* <Image className='w-auto' src="/public/oppus-icon.svg" alt="Logo" layout='fill'/> */}
    <h1 className="text-xl font-bold text-gray-700 hover:text-gray-900">
      <Link href="/app">Kontx.io</Link>
    </h1>
  </div>
);

export default SidebarHeader;
