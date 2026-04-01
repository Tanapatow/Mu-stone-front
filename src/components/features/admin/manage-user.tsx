'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, ShieldCheck } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

// ==========================================
// 1. DATA & CONFIGURATION (ส่วนข้อมูล)
// ==========================================
const MOCK_USERS = Array.from({ length: 45 }, (_, i) => ({
  id: `AZ-${9210 + i}`,
  name: i % 2 === 0 ? 'Jane Smith' : 'สมชาย ใจดี',
  email: i % 2 === 0 ? 'jane.smith@azure.com' : 'somchai.j@horizon.ai',
  role: i % 5 === 0 ? 'ADMIN' : 'USER',
  status: true,
}));

const ITEMS_PER_PAGE = 7;

export default function ManageUserFeature() {
  // ==========================================
  // 2. STATES & LOGIC (ส่วนคำนวณ)
  // ==========================================
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // กรองข้อมูลตามการค้นหา
  const filteredData = useMemo(() => {
    return MOCK_USERS.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id.includes(searchTerm),
    );
  }, [searchTerm]);

  // คำนวณการแบ่งหน้า (Pagination)
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // ==========================================
  // 3. UI RENDER (ส่วนแสดงผล)
  // ==========================================
  return (
    <div className="flex flex-col h-[calc(100vh-32px)] flex-1 space-y-6 px-8 pb-8 overflow-hidden">
      {/* --- Section: Header & Stats (Fixed) --- */}
      <div className="shrink-0 space-y-5">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">
          การจัดการผู้ใช้งาน
        </h1>

        <div className="flex flex-row items-center gap-6 w-full">
          {/* Search Box */}
          <div className="relative w-[340px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ค้นหาชื่อ, อีเมล หรือ ID..."
              className="pl-11 bg-white border-none h-12 rounded-2xl text-sm shadow-sm focus-visible:ring-1"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Stats Card: Total Users */}
          <div className="flex-1 max-w-[280px] bg-white p-4 rounded-[24px] shadow-sm flex items-center gap-4 border border-transparent hover:border-blue-100 transition-all">
            <div className="p-3 bg-[#E8F0FE] rounded-2xl shrink-0">
              <Users className="text-[#1967D2] h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">
                ผู้ใช้ทั้งหมด
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#1E1E1E]">1,284</span>
                <span className="text-[10px] bg-green-50 text-green-500 px-2 py-0.5 rounded-lg font-bold">
                  +12%
                </span>
              </div>
            </div>
          </div>

          {/* Stats Card: Admins */}
          <div className="flex-1 max-w-[240px] bg-white p-4 rounded-[24px] shadow-sm flex items-center gap-4 border border-transparent hover:border-orange-100 transition-all">
            <div className="p-3 bg-[#FFF4E5] rounded-2xl shrink-0">
              <ShieldCheck className="text-[#B06000] h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">
                ผู้ดูแลระบบ
              </p>
              <p className="text-2xl font-bold text-[#1E1E1E]">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section: White Container (Table & Pagination) --- */}
      <div className="flex-1 min-h-0 bg-white rounded-[40px] shadow-sm flex flex-col overflow-hidden border border-gray-100">
        {/* Table Header */}
        <div className="px-8 py-6 flex justify-between items-center shrink-0 border-b border-gray-50">
          <h3 className="text-xl font-bold text-[#1E1E1E]">รายชื่อผู้ใช้งาน</h3>
          <Button
            variant="outline"
            className="rounded-xl h-10 px-5 text-xs font-bold text-gray-500 border-gray-100 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" /> กรองข้อมูล
          </Button>
        </div>

        {/* Scrollable Table Area */}
        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="pl-8 text-[10px] font-bold text-gray-400 uppercase py-5">
                  รายชื่อ (NAME)
                </TableHead>
                <TableHead className="text-[10px] font-bold text-gray-400 uppercase py-5">
                  อีเมล (EMAIL)
                </TableHead>
                <TableHead className="text-center text-[10px] font-bold text-gray-400 uppercase py-5">
                  บทบาท (ROLE)
                </TableHead>
                <TableHead className="text-center text-[10px] font-bold text-gray-400 uppercase py-5">
                  สถานะ (STATUS)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="pl-8 py-5">
                    <div className="font-bold text-[#464E5F] text-sm">
                      {user.name}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium">
                      ID: {user.id}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500 text-xs font-medium">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`rounded-full px-3 py-0.5 text-[9px] font-bold border-none ${user.role === 'ADMIN' ? 'bg-[#E8F0FE] text-[#1967D2]' : 'bg-gray-100 text-gray-400'}`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Switch
                        checked={user.status}
                        className="scale-90 data-[state=checked]:bg-[#1967D2]"
                      />
                      <span className="text-[11px] font-bold text-green-600 w-12">
                        Active
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* --- Section: Pagination (Fixed Footer) --- */}
        <div className="px-8 py-5 border-t border-gray-50 shrink-0 bg-white flex justify-end items-center gap-2">
          <Button
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="text-gray-400 font-bold text-xs h-9 px-3 hover:text-[#1967D2] transition-colors"
          >
            ก่อนหน้า
          </Button>

          {/* สร้างเลขหน้า Dynamic */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-xl font-bold text-[11px] transition-all ${
                currentPage === page
                  ? 'bg-[#1967D2] text-white shadow-lg scale-105'
                  : 'bg-transparent text-gray-400 hover:bg-gray-100'
              }`}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="ghost"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="text-[#1967D2] font-bold text-xs h-9 px-3 hover:bg-blue-50"
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
  );
}
