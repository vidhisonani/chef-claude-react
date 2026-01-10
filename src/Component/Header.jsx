import ChefClaudeLogo from '../assets/chef-claude-icon.png'

function Header() {
  return (
    <>
      <header className='header'>
        <img className="logo"src={ChefClaudeLogo} alt="Chef Claude Logo" />
        <h1>Chef Claude</h1>
      </header>
    </>
  );
}

export default Header;
