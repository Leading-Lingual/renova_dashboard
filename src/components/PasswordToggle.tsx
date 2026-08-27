import EyeHideSolidIcon from "@iconify-react/clarity/eye-hide-solid";
import EyeSolidIcon from "@iconify-react/clarity/eye-solid";
import { InputGroupButton } from "./ui/input-group";

interface PasswordToggleProps {
  inputType: string;
  onAction: () => void;
}
const PasswordToggle: React.FC<PasswordToggleProps> = ({
  inputType,
  onAction,
}) => {
  return (
    <InputGroupButton onClick={() => onAction()} className="cursor-pointer">
      {inputType === "text" ? (
        <EyeSolidIcon className="size-6" />
      ) : (
        <EyeHideSolidIcon className="size-6" />
      )}
    </InputGroupButton>
  );
};

export default PasswordToggle;
