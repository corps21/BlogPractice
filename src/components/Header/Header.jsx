/* eslint-disable react/prop-types */
function Header({pageTitle="Home"}) {

  return (
    <header className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">{pageTitle}</h1>
      </div>
    </header>
  );
}

export default Header;
