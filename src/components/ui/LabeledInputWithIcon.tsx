import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconName: string;
  iconStyle?: string;
  id: string;
  label?: string;
}

const LabeledInputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconName, iconStyle, id, label, ...props }, ref) => {
    return (
      <div>
        {label && (
          <Label htmlFor={id} className={cn("mb-2 block text-sm font-medium")}>
            {label}
          </Label>
        )}

        <div className="relative">
          <input
            id={id}
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            ref={ref}
            {...props}
          />
          <span className="absolute inset-y-0 right-3 flex items-center pl-3">
            <Icon icon={iconName} className={cn("h-5 w-5", iconStyle)} />
          </span>
        </div>
      </div>
    );
  },
);
LabeledInputWithIcon.displayName = "Input";

export { LabeledInputWithIcon };
