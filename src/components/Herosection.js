import Link from 'next/link'
export default function Herosection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-black to-neutral-800">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
         
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
              🚀 Welcome to Our Webไซด์
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              อย่ากดเข้ามาออกไป
              <span className="block text-gray-300">
                ร้านนี้ไม่ดีเลยผมขอร้อง
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              เจ้าของเว็ปใช้เอไอทำให้ 
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/about"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black shadow-lg transition hover:scale-105"
              >
                เรียนรู้เพิ่มเติม
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
              >
                ติดต่อเรา
              </Link>
            </div>
          </div>
          {/* Right Content */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-white/10 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900"
                alt="Technology"
                className="relative w-full max-w-lg rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}