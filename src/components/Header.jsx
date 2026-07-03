import { Moon,Sun } from 'lucide-react';
const Header = ({theme, setTheme}) => {
   
  return (
    <header className=" mb-8 text-center flex flex-1 justify-between">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-400">Adaku</h1>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        
        { theme === "light" ? <Moon /> : <Sun />}
      </button>
    </header>
  );
};

export default Header;
