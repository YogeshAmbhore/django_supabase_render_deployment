export const Header = () => {
  return (
    <header className="bg-[#111d3a] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-wide cursor-pointer">
              Novelyt
            </h1>
            <p className="text-xs text-gray-300 leading-tight">
              A modern place for novels and books
            </p>
          </div>

          <ul className="flex items-center gap-8">
            {["Home", "Blog", "About", "Contact Us"].map((item) => (
              <li
                key={item}
                className="text-sm font-medium cursor-pointer transition-colors
                           hover:text-[#2f80ed]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
