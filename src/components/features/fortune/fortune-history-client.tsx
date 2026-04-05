"use client";

import { useState } from "react";
import type { FortuneLog } from "@/lib/api/fortune/fortune.type";
import FortuneLogList from "./user/fortune-log-list";
import FortuneLogDetail from "./user/fortune-log-detail";

type Props = {
  logs: FortuneLog[];
};

export default function FortuneHistoryClient({ logs }: Props) {
  const [selected, setSelected] = useState<FortuneLog | null>(null);

  return (
    <>
      <div className="card-glass">
        <FortuneLogList logs={logs} onSelect={setSelected} />
      </div>
      {selected && (
        <FortuneLogDetail log={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
