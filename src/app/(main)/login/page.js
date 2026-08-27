"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// ตรวจสอบ path นี้กับเอกสาร API อีกครั้ง (เหมือนหน้า login)
// รูปแบบที่พบบ่อยคือ /users หรือ /admin/users
const API_BASE = "https://api.itdev.cmtc.ac.th";
const USERS_URL = `${API_BASE}/users`;

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ดึง token ที่เก็บไว้ตอน login (ปรับ key "token" ให้ตรงกับที่หน้า login ใช้จริง)
  const getAuthHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(USERS_URL, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("โหลดข้อมูลผู้ใช้ไม่สำเร็จ");
      const data = await res.json();
      // ปรับบรรทัดนี้ตามรูปแบบจริงที่ API ส่งกลับมา เช่น { users: [...] } หรือ [...] ตรงๆ
      setUsers(data.users ?? data);
    } catch (err) {
      Swal.fire("เกิดข้อผิดพลาด", err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "ยืนยันการลบผู้ใช้นี้?",
      text: "ข้อมูลจะถูกลบออกจากระบบถาวร",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#e53935",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${USERS_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("ลบไม่สำเร็จ");
      Swal.fire("ลบสำเร็จ", "", "success");
      fetchUsers();
    } catch (err) {
      Swal.fire("เกิดข้อผิดพลาด", err.message, "error");
    }
  };

  const handleEdit = async (user) => {
    // ใช้ Swal.fire แบบฟอร์มแทนหน้าแยก เพื่อความเร็ว (จะทำเป็นหน้าแยกก็ได้)
    const { value: formValues } = await Swal.fire({
      title: "แก้ไขข้อมูลผู้ใช้",
      html:
        `<input id="swal-first_name" class="swal2-input" placeholder="ชื่อ" value="${user.first_name ?? ""}">` +
        `<input id="swal-last_name" class="swal2-input" placeholder="นามสกุล" value="${user.last_name ?? ""}">` +
        `<input id="swal-username" class="swal2-input" placeholder="Username" value="${user.username ?? ""}">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
      preConfirm: () => ({
        first_name: document.getElementById("swal-first_name").value,
        last_name: document.getElementById("swal-last_name").value,
        username: document.getElementById("swal-username").value,
      }),
    });

    if (!formValues) return;

    try {
      const res = await fetch(`${USERS_URL}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(formValues),
      });
      if (!res.ok) throw new Error("บันทึกไม่สำเร็จ");
      Swal.fire("บันทึกสำเร็จ", "", "success");
      fetchUsers();
    } catch (err) {
      Swal.fire("เกิดข้อผิดพลาด", err.message, "error");
    }
  };

  if (isLoading) {
    return <p style={{ padding: 40, textAlign: "center" }}>กำลังโหลดข้อมูล...</p>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginBottom: 4, color: "#111" }}>จัดการข้อมูลผู้ใช้งาน</h1>
      <p style={{ color: "#555", marginBottom: 20 }}>
        รายชื่อสมาชิกทั้งหมดในระบบ ({users.length} คน)
      </p>

      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,.1)" }}>
        <thead>
          <tr style={{ background: "#1e90ff", color: "#fff" }}>
            <th style={cellStyle}>ลำดับ</th>
            <th style={cellStyle}>ชื่อ</th>
            <th style={cellStyle}>นามสกุล</th>
            <th style={cellStyle}>Username</th>
            <th style={cellStyle}>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ ...cellStyle, color: "#333" }}>{i + 1}</td>
              <td style={{ ...cellStyle, color: "#333" }}>{u.first_name}</td>
              <td style={{ ...cellStyle, color: "#333" }}>{u.last_name}</td>
              <td style={{ ...cellStyle, color: "#333" }}>{u.username}</td>
              <td style={cellStyle}>
                <button onClick={() => handleEdit(u)} style={{ ...btnStyle, background: "#1e90ff", marginRight: 6 }}>
                  แก้ไข
                </button>
                <button onClick={() => handleDelete(u.id)} style={{ ...btnStyle, background: "#e53935" }}>
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = { padding: 12, textAlign: "left" };
const btnStyle = {
  padding: "6px 14px",
  border: "none",
  borderRadius: 6,
  color: "#fff",
  fontSize: 14,
  cursor: "pointer",
};