'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = '/rooms';
    } else {
      alert('Falha no registro');
    }
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-6 flex flex-col gap-3">
      <input className="border p-2" placeholder="nome" value={name} onChange={e=>setName(e.target.value)} />
      <input className="border p-2" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2" type="password" placeholder="senha" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="bg-green-600 text-white p-2 rounded">Criar conta</button>
    </form>
  );
}

