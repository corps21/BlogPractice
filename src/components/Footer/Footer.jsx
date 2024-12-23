function Footer() {
  return (
    <div className="w-5/6 mx-auto pb-[2rem] text-[#999999] font-[0.875rem] flex flex-col">
      <div>
      </div>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h3 className="text-[1rem] font-bold text-black mb-[.5rem]">
            The Project
          </h3>
          <a className="cursor-pointer hover:underline ">About</a>
          <a className="cursor-pointer hover:underline ">Blog</a>
          <a className="cursor-pointer hover:underline ">Press Kit</a>
        </div>
        <div className="flex flex-col">
          <h3 className="text-[1rem] font-bold text-black mb-[.5rem]">
            Learn More
          </h3>
          <a className="cursor-pointer hover:underline ">Pricing</a>
          <a className="cursor-pointer hover:underline ">Mac App</a>
          <a className="cursor-pointer hover:underline ">Teams</a>
          <a className="cursor-pointer hover:underline ">Creators</a>
        </div>
        <div className="flex flex-col">
          <h3 className="text-[1rem] font-bold text-black mb-[.5rem]">
            Support
          </h3>
          <a className="cursor-pointer hover:underline ">Contact</a>
          <a className="cursor-pointer hover:underline ">FAQ</a>
          <a className="cursor-pointer hover:underline ">Creators Handbook</a>
          <a className="cursor-pointer hover:underline ">Terms of Use</a>
          <a className="cursor-pointer hover:underline ">Privacy Policy</a>
          <a className="cursor-pointer hover:underline ">Creator Terms</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
