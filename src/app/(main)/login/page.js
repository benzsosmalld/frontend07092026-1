'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt with:', email, password)
  }

  return (
    // 🛠️ จุดที่แก้ไข: ใช้ h-[calc(100vh-80px)] เพื่อให้ความสูงพอดีจอเป๊ะๆ หักลบ Navbar ออก
    <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      
      {/* ส่วนกล่อง Login (Card) */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
        
        {/* ส่วนหัว (Header & Logo) */}
        <div className="text-center mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-2xl shadow-lg shadow-indigo-500/30 mb-4">
            M
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            ยินดีต้อนรับกลับมา
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบบัญชีของคุณ
          </p>
        </div>

        {/* ฟอร์มเข้าสู่ระบบ */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              อีเมล
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                ลืมรหัสผ่าน?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* ปุ่ม Login */}
          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        {/* ตัวคั่น (Divider) */}
        <div className="mt-8 mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                หรือ
              </span>
            </div>
          </div>
        </div>

        {/* ส่วนลิงก์สมัครสมาชิก */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ยังไม่มีบัญชีใช่ไหม?{' '}
            <Link 
              href="/register" 
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full"
            >
              สมัครสมาชิกเลย
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  )
}