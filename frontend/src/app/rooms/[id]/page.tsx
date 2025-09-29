'use client';
import { useEffect, useState } from 'react';

export default function RoomDetail({ params }: { params: { id: string }}) {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [reservations, setReservations] = useState<any[]>([]);
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('10:00');

  function fetchAvailability() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations/availability?roomId=${params.id}&date=${date}`)
      .then(r => r.json()).then(d => setReservations(d.reservations || [])).catch(()=>setReservations([]));
  }

  useEffect(() => { fetchAvailability(); }, [date]);

  async function book() {
    const token = localStorage.getItem('token');
    const startIso = new Date(`${date}T${start}:00`).toISOString();
    const endIso = new Date(`${date}T${end}:00`).toISOString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ roomId: params.id, startTime: startIso, endTime: endIso }),
    });
    if (res.ok) { alert('Reserva criada'); fetchAvailability(); }
    else { alert('Conflito ou erro'); }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Reservar sala</h1>
      <div className="flex gap-2 items-center">
        <label>Data:</label>
        <input type="date" className="border p-2" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      <div>
        <h2 className="font-medium mb-2">Reservas existentes</h2>
        <ul className="space-y-1">
          {reservations.map((r, i) => (
            <li key={i} className="text-sm">{new Date(r.startTime).toLocaleTimeString()} - {new Date(r.endTime).toLocaleTimeString()}</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        <input className="border p-2" type="time" value={start} onChange={e=>setStart(e.target.value)} />
        <input className="border p-2" type="time" value={end} onChange={e=>setEnd(e.target.value)} />
        <button className="bg-blue-600 text-white px-3 rounded" onClick={book}>Reservar</button>
      </div>
    </div>
  );
}

