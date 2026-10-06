"use client";

import { Suspense } from "react";
import UnifiedStudioUploader from "@/components/admin/UnifiedStudioUploader";

export default function AdminUpload3DPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs font-semibold text-neutral-400">
          Loading Studio Work Uploader...
        </div>
      }
    >
      <UnifiedStudioUploader initialTool="3d" />
    </Suspense>
  );
}
