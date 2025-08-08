import React from 'react';
import { AlertTriangle } from 'lucide-react'; 

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 px-4">
      <div className="max-w-md w-full bg-red-50 border-l-8 border-red-600 shadow-2xl rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-red-600 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-red-700 mb-2">¡Acceso Denegado!</h1>
        <p className="text-red-800 mb-6">
          Tu usuario no está habilitado para acceder al sistema en este momento.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
