import ChefClaudeLogo from "../assets/chef-claude-icon.png";

function Header() {
  return (
    <header className="flex justify-center items-center gap-2.5 bg-white shadow-sm h-20">
      <img className="w-10" src={ChefClaudeLogo} alt="Chef Claude Logo" />
      <h1 className="text-4xl font-normal">Chef Claude</h1>
    </header>
  );
}

export default Header;