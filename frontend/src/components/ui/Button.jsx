export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md font-medium transition duration-300 bg-blue-600 hover:bg-blue-700 text-white ${className}`}
    >
      {children}
    </button>
  )
}
