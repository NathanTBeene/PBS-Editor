import { Dialog } from "radix-ui";
import Alert from "../components/ui/Alert";
import Modal from "../components/ui/Modal";

const AbilitiesPage = () => {
  return (
    <div>
      <Alert
        triggerText="Open Alert"
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        confirmText="Yes, Delete Account"
        confirmType="gray"
        onConfirm={() => console.log("Confirmed")}
      />
    </div>
  );
};

export default AbilitiesPage;
