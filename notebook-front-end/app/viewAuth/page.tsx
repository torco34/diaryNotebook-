import FormAuth from "../components/form/FormAuth";
const PageAuth = () => {
  return (
    <div className="w-full h-screen  bg-blue-950  text-white flex items-center justify-center">
      <main className="flex flex-col  row-start-2 w-full items-center ">
        <FormAuth />
      </main>
    </div>
  );
};

export default PageAuth;
