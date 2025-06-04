export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <img
              src="/logo.png"
              alt="Pet Lab Co Logo"
              width={50}
              height={50}
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Pet Lab Co
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
