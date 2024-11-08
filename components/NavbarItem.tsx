interface NavbarItemProps {
  label: string
}

const NavbarItem = ({ label }: NavbarItemProps) => {
  return (
    <div className="cursor-pointer text-white transition hover:text-gray-300">
      {label}
    </div>
  )
}

export default NavbarItem
