import Sidebar from "@/app/components/Sidebar.jsx";
const layout = ({ children }) => {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      {children}
    </div>
  );
};

export default layout;
