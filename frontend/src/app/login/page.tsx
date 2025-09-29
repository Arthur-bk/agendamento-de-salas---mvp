'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = '/rooms';
    } else {
      alert('Falha no login');
    }
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-6 flex flex-col gap-3">
      <input className="border p-2" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2" type="password" placeholder="senha" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white p-2 rounded">Entrar</button>
    </form>
  );
}

