/* eslint-disable react/prop-types */
function Header({pageTitle="Home"}) {

  return (
    <header className="flex flex-col w-full gap-3">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-semibold">{pageTitle}</h1>
      </div>
    </header>
  );
}

export default Header;
