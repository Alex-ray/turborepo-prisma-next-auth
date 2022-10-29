import Link from 'next/link'

type NavLink = {
  href: string,
  children?: React.ReactNode
};

export function NavLink({ href, children }: NavLink) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  )
}
