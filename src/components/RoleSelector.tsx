import React from 'react';
import { SPEECH_ROLES, type SpeechRole } from '../data/speechRoles';

interface RoleSelectorProps {
  selectedId: string;
  onChange: (role: SpeechRole) => void;
  disabled: boolean;
}

function formatThreshold(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m}:00` : `${m}:${String(s).padStart(2, '0')}`;
}

export function RoleSelector({ selectedId, onChange, disabled }: RoleSelectorProps) {
  const selected = SPEECH_ROLES.find((r) => r.id === selectedId)!;

  return (
    <div className="flex flex-col gap-2 w-full">
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
      {selectedId !== 'custom' && (
        <div className="flex gap-2 text-[10px] text-gray-500 font-mono">
          <span className="text-green-500">● {formatThreshold(selected.green)}</span>
          <span className="text-yellow-500">● {formatThreshold(selected.yellow)}</span>
          <span className="text-red-500">● {formatThreshold(selected.red)}</span>
        </div>
      )}
    </div>
  );
}
