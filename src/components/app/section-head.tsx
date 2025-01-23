import React from "react";
import { Separator } from "../ui/separator";

interface SectionHeadProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

const SectionHeadMemo: React.FC<SectionHeadProps> = ({
  title,
  description,
  actions,
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
        {actions}
      </div>
      <Separator className="my-4" />
    </>
  );
};

export const SectionHead = React.memo(SectionHeadMemo);
