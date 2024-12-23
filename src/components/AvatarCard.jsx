/* eslint-disable react/prop-types */

export default function AvatarCard({avatarHref="https://i.pravatar.cc/24", avatarName="John Doe",className=""}) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
        <figure className="w-6 h-6">
            <img src={avatarHref} alt="Author avatar" className="rounded-full"/>
        </figure>
        <p className="text-sm font-medium">{avatarName}</p>
    </div>
  )
}
