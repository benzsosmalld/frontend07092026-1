import Image from 'next/image';

export default function Cardsection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* หัวข้อ Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">สินค้าแนะนำ</h2>
          <p className="mt-2 text-gray-600">เลือกชมสินค้าที่น่าสนใจของเราในเดือนนนนนนนนน นี้!!!</p>
        </div>

        {/* ตะแกรง Grid แบบ 3 คอลัมน์ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ==================== การ์ดใบที่ 1 ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
                alt="โทรศัพท์ ไอโฟ๊ง"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                โทรศัพท์ ไอโฟ๊ง
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                โทรศัพท์มือถือรุ่นใหม่ล่าสุด พร้อมกล้องคุณภาพสูงและประสิทธิภาพที่ยอดเยี่ยม
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">฿4,990</span>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>

          {/* ==================== การ์ดใบที่ 2 ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1550439062-609e1531270e?w=900"
                alt="จอสำหรับทำงานสองจอ"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                จอสำหรับทำงานสองจอ
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                จอแสดงผลความละเอียดสูง พร้อมเทคโนโลยี HDR
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">฿25,900</span>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>

          {/* ==================== การ์ดใบที่ 3 ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900"
                alt="NoteBook Gaming"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                NoteBook Gaming
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                คอมพิวเตอร์สำหรับเล่นเกม ประสิทธิภาพสูง หน่วยประมวลผลแรง
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">฿3,200</span>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}