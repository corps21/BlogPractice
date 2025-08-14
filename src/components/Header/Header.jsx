function Header({ pageTitle = "Home" }) {
  return (
    <h1 className="w-full text-2xl font-semibold dark:text-white">{pageTitle}</h1>
  );
}

export default Header;
