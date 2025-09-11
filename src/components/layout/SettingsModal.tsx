import Modal from "@/components/ui/Modal";
import { currentVersion } from "@/lib/data/versionHistory";
import { useIndexedDB } from "@/lib/hooks/useIndexedDB";
import { useAlertContext } from "@/lib/providers/AlertProvider";

interface SettingsModalProps {
  triggerElement?: React.ReactNode;
}

const DataManagementButton = ({
  text,
  color,
  action,
}: {
  text: string;
  color: string;
  action?: () => void;
}) => {
  return (
    <button
      className={`${color} rounded-md bg-slate-700 px-4 py-2 text-sm transition-all hover:scale-105 cursor-pointer`}
      onClick={action}
    >
      {text}
    </button>
  );
};

const SettingsModal = ({ triggerElement }: SettingsModalProps) => {
  const { clearDatabase, clearObjectStore } = useIndexedDB();
  const { showWarning } = useAlertContext();

  const askReload = async () => {
    if (
      await showWarning(
        "Reload Required",
        "There have been changes made that require a reload. Reload now?"
      )
    ) {
      window.location.reload();
    }
  };

  const dataManagementButtons = [
    {
      text: "Clear Database",
      color: "hover:bg-amber-600",
      action: async () => {
        if (
          await showWarning(
            "Clear Database?",
            "Are you sure you want to clear the entire database? This action cannot be undone."
          )
        ) {
          clearDatabase();
          askReload();
        }
      },
    },
    {
      text: "Clear Pokemon",
      color: "hover:bg-rose-600",
      action: async () => {
        if (
          await showWarning(
            "Clear Pokemon?",
            "Are you sure you want to clear all Pokemon data? This action cannot be undone."
          )
        ) {
          clearObjectStore("pokemon");
          askReload();
        }
      },
    },
    {
      text: "Clear Moves",
      color: "hover:bg-sky-600",
      action: async () => {
        if (
          await showWarning(
            "Clear Moves?",
            "Are you sure you want to clear all Moves data? This action cannot be undone."
          )
        ) {
          clearObjectStore("moves");
          askReload();
        }
      },
    },
    {
      text: "Clear Abilities",
      color: "hover:bg-violet-600",
      action: async () => {
        if (
          await showWarning(
            "Clear Abilities?",
            "Are you sure you want to clear all Abilities data? This action cannot be undone."
          )
        ) {
          clearObjectStore("abilities");
          askReload();
        }
      },
    },
    {
      text: "Clear Constants",
      color: "hover:bg-emerald-600",
      action: async () => {
        if (
          await showWarning(
            "Clear Constants?",
            "Are you sure you want to clear all Constants data? This action cannot be undone."
          )
        ) {
          clearObjectStore("constants");
          askReload();
        }
      },
    },
  ];

  return (
    <Modal
      triggerElement={triggerElement}
      title="Settings"
      maxWidth="max-w-lg"
      contentClass="max-h-[80vh] relative min-h-80 overflow-y-auto"
    >
      <h2 className="text-sm text-slate-400 absolute bottom-2 left-4">
        Editor {currentVersion}
      </h2>
      {/* Data Management */}
      <div className="flex flex-col">
        <h2 className="font-semibold">Data Management</h2>
        <p className="text-sm text-slate-400">
          Clearing the database will neccesitate a reload since the program will
          need to re-import the fresh data from it's internal PBS files.
        </p>
        <div className="flex flex-wrap gap-2 my-4">
          {dataManagementButtons.map((button) => (
            <DataManagementButton key={button.text} {...button} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
