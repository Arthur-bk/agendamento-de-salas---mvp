'use client';
import { useEffect, useState } from 'react';

type Room = { id: string; name: string; capacity: number };

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, { headers: { Authorization: `Bearer ${token}` }})
      .then(r => r.json()).then(setRooms).catch(() => setRooms([]));
  }, []);
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Salas</h1>
      <ul className="space-y-2">
        {rooms.map(r => (
          <li key={r.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{r.name}</div>
              <div className="text-sm text-gray-500">Capacidade: {r.capacity}</div>
            </div>
            <a className="text-blue-600 underline" href={`/rooms/${r.id}`}>Reservar</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

