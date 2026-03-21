"use client";

import { useState } from "react";
import { WorkStatusBadge } from "@/components/elements/WorkStatusBadge";
import { WorkStatusForm } from "./WorkStatusForm";
import type { WorkState, MediaType } from "../types";

type WorkStatusSectionProps = {
  workId: number;
  mediaType: MediaType;
  initialState: WorkState | null;
  isSignin: boolean;
};

/**
 * 作品の視聴状態表示＋変更フォーム
 * @param param0
 * @returns
 */
export function WorkStatusSection({
  workId,
  mediaType,
  initialState,
  isSignin,
}: WorkStatusSectionProps) {
  const [currentState, setCurrentState] = useState<WorkState | null>(
    initialState,
  );

  if (!isSignin) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      {currentState != null && <WorkStatusBadge state={currentState} />}
      <WorkStatusForm
        workId={workId}
        mediaType={mediaType}
        currentState={currentState}
        onStateChanged={setCurrentState}
      />
    </div>
  );
}
