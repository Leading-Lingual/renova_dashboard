import { YellowStrokes } from "@/assets/YellowStrokes";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full h-full relative bg-cover bg-center bg-no-repeat bg-white md:bg-[url('/background-img.png')] overflow-hidden ">
      <div className="bg-[#01240BCC] hidden md:block absolute inset-0"></div>
      <main className="flex h-full overflow-hidden z-10 w-full">
        {children}
      </main>
      <YellowStrokes className="absolute bottom-0 left-7 hidden md:block" />
    </div>
  );
};

export default AuthLayout;
