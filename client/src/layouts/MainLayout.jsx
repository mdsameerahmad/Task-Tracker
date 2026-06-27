import Navbar from '../components/Navbar.jsx';

const MainLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">{children}</main>
    </div>
  );
};

export default MainLayout;
