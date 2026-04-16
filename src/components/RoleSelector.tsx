import React from 'react';
import { SPEECH_ROLES, type SpeechRole } from '../data/speechRoles';

interface RoleSelectorProps {
  selectedId: string;
  onChange: (role: SpeechRole) => void;
  disabled: boolean;
}

export function RoleSelector({ selectedId, onChange, disabled }: RoleSelectorProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">
        Speech Role
      </label>
      <select
        value={selectedId}
        disabled={disabled}
        onChange={(e) => {
          const role = SPEECH_ROLES.find((r) => r.id === e.target.value)!;
          onChange(role);
        }}
        className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {SPEECH_ROLES.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
    </div>
  );
}
