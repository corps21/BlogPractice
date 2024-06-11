
function Footer() {
    return (
      <div className="w-5/6 flex justify-between mx-auto py-4 my-2">
          <div className="flex flex-col space-y-1">
              <h3 className="text-2xl my-4">The Project</h3>
              <a className="cursor-pointer hover:underline">About</a>
              <a className="cursor-pointer hover:underline">Blog</a>
              <a className="cursor-pointer hover:underline">Press Kit</a>
          </div>
          <div className="flex flex-col space-y-1" >
            <h3 className="text-2xl my-4">Learn More</h3>
            <a className="cursor-pointer hover:underline">Pricing</a>
            <a className="cursor-pointer hover:underline">Mac App</a>
            <a className="cursor-pointer hover:underline">Teams</a>
            <a className="cursor-pointer hover:underline">Creators</a>
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-2xl my-4">Support</h3>
            <a className="cursor-pointer hover:underline">Contact</a>
            <a className="cursor-pointer hover:underline">FAQ</a>
            <a className="cursor-pointer hover:underline">Creators Handbook</a>
            <a className="cursor-pointer hover:underline">Terms of Use</a>
            <a className="cursor-pointer hover:underline">Privacy Policy</a>
            <a className="cursor-pointer hover:underline">Creator Terms</a>
          </div>
      </div>
    )
  }
  
  export default Footer