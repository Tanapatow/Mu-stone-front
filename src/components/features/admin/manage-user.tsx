'use client';

import { banUser } from '@/lib/actions/admin.action';
import { GetAllUserResponse } from '@/lib/api/admin/admin.type';

type UserTableProps = GetAllUserResponse;

export default function UserTable({ users, meta }: UserTableProps) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          {/* Header */}
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-4">NAME (ชื่อ)</th>
              <th className="px-6 py-4">EMAIL (อีเมล)</th>
              <th className="px-6 py-4">ROLE (บทบาท)</th>
              <th className="px-6 py-4">STATUS (สถานะ)</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {users.map((user) => (
              <tr className="border-t" key={user.id}>
                {/* Name */}
                <td className="px-6 py-4">
                  <div className="font-semibold">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-gray-500">ID: {user.id}</div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-gray-700">{user.email}</td>

                {/* Role */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                    {user.role}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className="flex items-center gap-2">
                    <button
                      onClick={async () => {
                        try {
                          banUser(user.id, !user.isActive);
                          // TODO: refresh data
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className={`w-10 h-5 rounded-full relative hover:cursor-pointer ${
                        user.isActive ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition ${
                          user.isActive ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
