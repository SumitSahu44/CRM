import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name') || 'User';
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Icon */}
        <button onClick={toggleSidebar} className="md:hidden block">
          <Menu size={24} />
        </button>
        <div className="text-xl font-bold">DSS CRM</div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="hidden sm:block font-medium">{userName}</span>
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
          alt="Profile"
          className="w-8 h-8 rounded-full border border-white"
        />
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
