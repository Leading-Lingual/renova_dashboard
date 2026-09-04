import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="flex h-full w-full">
      <SideBar />
      <div className="flex flex-col w-full">
        <NavBar />
        {children}
      </div>
    </main>
  );
};

export default AuthenticatedLayout;
