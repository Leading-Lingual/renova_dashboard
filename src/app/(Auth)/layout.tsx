const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen h-full relative bg-cover bg-center bg-no-repeat bg-white md:bg-[url('/background-img.png')] overflow-hidden ">
      <div className="bg-[#01240BCC] hidden md:block absolute inset-0"></div>
      <main className="flex h-full overflow-hidden p-4 md:py-12 md:px-20 z-10 w-full">{children}</main>
    </div>
  );
};

export default AuthLayout;
