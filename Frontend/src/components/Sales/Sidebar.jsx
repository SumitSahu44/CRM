import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  const links = [
    { label: 'Dashboard', to: '/sales/dashboard' },
    { label: 'View Leads', to: '/sales/view-leads' },
  ];

  return (
    <>
      <div
        className={`fixed top-14 left-0 h-screen w-30 bg-blue-700 text-white p-6 z-40
        transform transition-transform duration-300 o md:translate-x-0 md:static md:block
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-6 hidden md:block">Panel</h2>

        <nav className="flex flex-col space-y-4">
          {links.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className="hover:bg-blue-800 px-1 py-2 rounded transition"
              onClick={toggleSidebar}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
