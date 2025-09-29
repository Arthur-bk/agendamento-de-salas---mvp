import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Sistema de Reservas de Salas</h1>
        <p className="text-gray-600">Faça login ou registre-se para reservar salas.</p>
        <div className="flex gap-4">
          <a className="text-blue-600 underline" href="/login">Login</a>
          <a className="text-green-600 underline" href="/register">Registrar</a>
          <a className="text-purple-600 underline" href="/rooms">Salas</a>
        </div>
      </main>
    </div>
  );
}
