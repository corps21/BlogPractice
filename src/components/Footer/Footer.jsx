
function Footer() {
    return (
      <div className="w-5/6 mx-auto space-y-[2rem] text-center pb-[2rem]">
          <div className="flex flex-col space-y-1">
              <h3 className="text-3xl">The Project</h3>
              <a className="cursor-pointer hover:underline text-lg text-[#999999]">About</a>
              <a className="cursor-pointer hover:underline text-lg text-[#999999]">Blog</a>
              <a className="cursor-pointer hover:underline text-lg text-[#999999]">Press Kit</a>
          </div>
          <div className="flex flex-col space-y-1" >
            <h3 className="text-3xl">Learn More</h3>
            <a className="cursor-pointer hover:underline text-lg text-[#999999]">Pricing</a>
            <a className="cursor-pointer hover:underline text-lg text-[#999999]">Mac App</a>
            <a className="cursor-pointer hover:underline text-lg text-[#999999]">Teams</a>
            <a className="cursor-pointer hover:underline text-lg text-[#999999]">Creators</a>
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-3xl">Support</h3>
            <a className="cursor-pointer hover:underline text-lg text-[#999999]">Contact</a>
            <a className="cursor-pointer hover:underline text-lg text-[#999999]">FAQ</a>
            <a className="cursor-pointer hover:underline text-lg text-[#999999]">Creators Handbook</a>
            <a className="cursor-pointer hover:underline text-lg text-[#999999]">Terms of Use</a>
            <a className="cursor-pointer hover:underline text-lg text-[#999999]">Privacy Policy</a>
            <a className="cursor-pointer hover:underline text-lg text-[#999999]">Creator Terms</a>
          </div>
      </div>
    )
  }
  
  export default Footer