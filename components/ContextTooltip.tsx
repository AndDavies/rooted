"use client";

import * as Tooltip from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

interface ContextTooltipProps {
  term: string;
  description: string;
  children: ReactNode;
}

export function ContextTooltip({ term, description, children }: ContextTooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="underline decoration-dotted cursor-help text-primary">
            {children}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-popover text-popover-foreground max-w-xs p-3 rounded-md shadow-md border text-sm"
            sideOffset={5}
          >
            <strong>{term}</strong>: {description}
            <Tooltip.Arrow className="fill-popover" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}