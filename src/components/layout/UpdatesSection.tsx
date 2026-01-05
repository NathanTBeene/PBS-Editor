import React from "react";
import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "lucide-react";
import { versionHistory } from "@/lib/data/versionHistory";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={`${className} flex cursor-pointer items-center font-semibold justify-between w-full p-2 px-6 text-amber-400/80`}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className="text-amber-400/50 cursor-pointer" />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={`AccordionContent ${className} overflow-hidden text-sm text-slate-400`}
    {...props}
    ref={forwardedRef}
  >
    <div className="px-10 py-2 pb-4">{children}</div>
  </Accordion.Content>
));

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={`AccordionItem ${className} overflow-hidden my-1 focus-within:relative focus-within:z-10`}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

const UpdatesSection = () => {
  const markColors = {
    "!": "text-rose-300",
    "*": "text-emerald-300",
    "-": "text-amber-300",
    "?": "text-sky-300",
    "#": "text-zinc-600",
  };

  return (
    <div className={`absolute z-[100] top-[15%] left-30 bg-slate-900/60 rounded-lg shadow-lg text-white border border-slate-800
      2xl:w-100 xl:w-80 lg:w-40 lg:block hidden
      transition-all
    `}>
      <h1 className="text-lg font-bold p-4 mb-2 border-b border-slate-800 text-slate-300">
        Updates
      </h1>
      {/* Updates Container */}
      <div className="overflow-y-auto max-h-70">
        <Accordion.Root type="single" defaultValue="item-1" collapsible>
          {Object.entries(versionHistory).map(([version, changes]) => (
            <AccordionItem key={version} value={version}>
              <AccordionTrigger className="cursor-pointer">
                {version}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1">
                  {changes.map((change, index) => {
                    if (
                      markColors[change[0] as keyof typeof markColors] ===
                      undefined
                    ) {
                      return <li key={index}>{change}</li>;
                    }
                    const mark = change[0];
                    const color =
                      markColors[mark as keyof typeof markColors] || "";
                    const text = change.slice(1).trim();
                    return (
                      <li key={index} className={color}>
                        {text}
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
};

export default UpdatesSection;
