import ChefClaudeLogo from "../assets/chef-claude-icon.png";
import useAuth from '../hooks/useAuth';

function Header() {
  const { user, login, logout } = useAuth();

  return (
    <header className="flex justify-between items-center gap-2.5 bg-white shadow-sm h-20 px-6">
      <div className="flex justify-center items-center gap-2.5">
        <img className="w-10" src={ChefClaudeLogo} alt="Chef Claude Logo" />
        <h1 className="text-4xl font-normal">Chef Claude</h1>
      </div>
      <div className="flex items-center gap-3 px-6">
        {user ? (
          <>
            <img
              src={user.photo}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-slate-600 hidden md:block">{user.name}</span>
            <button
              onClick={logout}
              className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={login}
            className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700 transition-colors"
          >
            Login with Google
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;