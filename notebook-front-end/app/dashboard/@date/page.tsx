// import { FormCreate } from "@/app/components/form/FormCreate";
import { FormCreate } from "@/app/components/form/FormCreate";

export default function Date() {
  return (
    <>
      <div className="mx-6 w-full p-6 text-slate-100">
        <h2 className="font-semibold text-2xl p-4">
          Apuntes de Compras Diarias
        </h2>

        <FormCreate />
      </div>
    </>
  );
}
