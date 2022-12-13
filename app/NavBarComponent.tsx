import Link from "next/link"

type Props = {
    category: string
    isActive: boolean
}

function NavBarComponent({ category, isActive}: Props) {
  return (
    <Link href={`/news/${category}`}
    className={`navLink ${isActive && 'underline decoration-orange-400 underline-offset-8 font-bold text-lg'}`}
    >{category}</Link>
  )
}

export default NavBarComponent