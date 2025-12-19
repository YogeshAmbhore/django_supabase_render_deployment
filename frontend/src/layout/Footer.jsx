export const Footer = () => {
  return (
    <footer className="bg-[#111d3a] text-gray-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-14 flex items-center justify-center">
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-white">Yogesh Ambhore</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
