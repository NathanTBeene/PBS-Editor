import React from "react";
import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "lucide-react";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={`${className} flex items-center font-semibold justify-between w-full p-2 px-6 text-amber-400/80`}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className="text-amber-400/50" aria-hidden />
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
    <div className="px-10 py-4">{children}</div>
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
  const updates = {
    "v.1.0.1": [
      "Fixed abilities not properly updating.",
      "Fixed base stats being flipped around.",
    ],
  };

  return (
    <div className="absolute top-[15%] left-30 w-100 bg-slate-900/60 rounded-lg shadow-lg text-white">
      <h1 className="text-lg font-bold p-4 mb-2 border-b border-slate-800 text-slate-300">
        Updates
      </h1>
      {/* Updates Container */}
      <div className="overflow-y-auto max-h-50">
        <Accordion.Root type="single" defaultValue="item-1" collapsible>
          {Object.entries(updates).map(([version, changes]) => (
            <AccordionItem key={version} value={version}>
              <AccordionTrigger>{version}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1">
                  {changes.map((change, index) => (
                    <li key={index}>{change}</li>
                  ))}
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
