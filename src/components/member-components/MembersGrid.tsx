export const MembersGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-rows-3 xl:grid-cols-4 gap-5 w-full md:w-5/6 mx-auto px-3 md:px-5 justify-center">
      {children}
    </div>
  )
}
