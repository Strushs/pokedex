import RegisterForm from "@/components/RegisterForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-t-3xl shadow-2xl border-b-8 border-gray-900 border-opacity-20 relative overflow-hidden">
        {/* Dekoracyjne elementy pokeballa */}
        <div className="absolute top-0 left-0 w-full h-4 bg-red-600"></div>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-white border-4 border-gray-800 rounded-full flex items-center justify-center shadow-inner">
            <div className="w-8 h-8 bg-gray-100 border-2 border-gray-800 rounded-full shadow-sm"></div>
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Pokedex PWA
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-gray-500">
          Projekt zaliczeniowy z wymaganiami na ocenę{" "}
          <span className="text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded">
            5.0
          </span>
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-50 py-8 px-4 shadow-2xl rounded-b-3xl sm:px-10 border-t-8 border-gray-800">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
