export default function ExecMember({ name, title, image, socials }) {
  return (
    <div className="mb-6 w-full px-6 sm:px-6 md:w-6/12 lg:w-3/12 lg:px-4">
      <div className="flex flex-col">
        <a href="#" className="mx-auto">
          <img
            className="rounded-2xl drop-shadow-md transition-all delay-100 duration-200 hover:drop-shadow-xl"
            src={image}
          />
        </a>
        <div className="mt-6 text-center">
          <h1 className="mb-1 text-xl font-bold text-gray-100">{name}</h1>
          <div className="mb-2 font-light text-gray-300">{title}</div>
          <div
            className="flex items-center justify-center opacity-50 transition-opacity
                          duration-300 hover:opacity-100"
          >
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                className="flex h-10 w-10 rounded-full hover:bg-indigo-50/10"
              >
                <i className="mdi mdi-linkedin mx-auto mt-2 text-indigo-500" />
              </a>
            )}
            {socials.twitter && (
              <a
                href="#"
                className="flex h-10 w-10 rounded-full hover:bg-blue-50/10"
              >
                <i className="mdi mdi-twitter mx-auto mt-2 text-blue-300" />
              </a>
            )}
            {socials.instagram && (
              <a
                href="#"
                className="flex h-10 w-10 rounded-full hover:bg-orange-50/10"
              >
                <i className="mdi mdi-instagram mx-auto mt-2 text-orange-400" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
