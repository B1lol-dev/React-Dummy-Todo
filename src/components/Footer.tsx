import { CheckSquare, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 block!">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <CheckSquare className="h-5 w-5 text-indigo-400" />
            <span className="text-lg font-semibold">DummyTodo</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/B1lol-dev/React-Dummy-Todo"
                className="hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>

            <div className="text-sm text-gray-400 mt-2 md:mt-0">
              &copy; {new Date().getFullYear()} DummyTodo. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
