"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

export default function AdminUsersPage() {
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // เช็คสิทธิ์ก่อน — ถ้าโหลดเสร็จแล้วไม่ใช่ admin ให้เด้งออก
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.replace("/login");
      } else if (!isAdmin) {
        router.replace("/"); // หรือหน้าอื่นที่เหมาะสม
      }
    }
  }, [authLoading, user, isAdmin, router]);

  useEffect(() => {
    if (!isAdmin) return; // ไม่ใช่ admin ไม่ต้องดึงข้อมูล

    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAdmin]);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const keyword = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(keyword) ||
        u.email?.toLowerCase().includes(keyword)
    );
  }, [users, search]);

  // ระหว่างเช็คสิทธิ์ หรือยังไม่ใช่ admin ไม่ต้องแสดงอะไร
  if (authLoading || !isAdmin) {
    return <div className="p-8">กำลังตรวจสอบสิทธิ์...</div>;
  }

  if (loading) return <div className="p-8">กำลังโหลดข้อมูล...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">จัดการผู้ใช้งาน</h1>

      <input
        type="text"
        placeholder="ค้นหาด้วยชื่อหรืออีเมล..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 mb-4 w-full max-w-sm text-black"
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">ชื่อ</th>
              <th className="p-2">อีเมล</th>
              <th className="p-2">บทบาท</th>
              <th className="p-2">สมัครเมื่อ</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-400">
                  ไม่พบข้อมูลผู้ใช้
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="p-2">{u.name || "-"}</td>
                  <td className="p-2">{u.email || "-"}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="p-2">
                    {u.createdAt
                      ? new Date(
                          u.createdAt.seconds
                            ? u.createdAt.seconds * 1000
                            : u.createdAt
                        ).toLocaleDateString("th-TH")
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}