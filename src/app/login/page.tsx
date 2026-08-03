'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, ShieldCheck, ArrowRight, Lock, Mail, Globe } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@omex.ae');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen w-screen flex bg-slate-900 font-sans">
      {/* Left Marketing Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-[#0d5e2b] via-[#169C47] to-emerald-500 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Omex Express Logo"
              className="w-12 h-12 object-contain bg-white rounded-2xl p-1 shadow-lg"
            />
            <div>
              <h1 className="font-extrabold text-2xl tracking-wide">OMEX EXPRESS</h1>
              <p className="text-xs text-emerald-100">Delivery Services System</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-4 max-w-md">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-emerald-100">
            Enterprise Logistics
          </span>
          <h2 className="text-4xl font-black leading-tight">
            Streamline UAE Couriers, Fleet & Financials
          </h2>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Real-time GPS tracking across Dubai, Abu Dhabi, and all 7 Emirates. Automated 5% VAT calculations and instant client ledgers.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-emerald-200 border-t border-emerald-400/30 pt-6">
          <span>&copy; 2026 OMEX Express Portal</span>
          <span>Bilingual AR/EN Powered</span>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="bg-[#169C47] text-white font-black p-2 rounded-xl text-xl">
                O
              </div>
              <span className="font-bold text-xl text-[#169C47]">OMEX EXPRESS</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Portal Sign In</h2>
            <p className="text-xs text-slate-500">Access your office dispatch and management workspace</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email / Username</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full ps-10 pe-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-[#169C47] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full ps-10 pe-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-[#169C47] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 font-medium text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-[#169C47] rounded" />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-bold text-[#169C47] hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#169C47] hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Sign In to Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <p className="text-center text-[11px] text-slate-400 font-semibold uppercase">Or continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="py-2.5 px-4 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <span>Google Account</span>
              </button>
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="py-2.5 px-4 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <span>Apple ID</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
