import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/Sales/Sidebar';
import { Outlet } from 'react-router-dom';

const SalesLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className='w-full'>
          <Outlet /> {/* This renders the current page (Dashboard, Add Lead, etc.) */}
        </main>
      </div>
    </div>
  );
};

export default SalesLayout;
