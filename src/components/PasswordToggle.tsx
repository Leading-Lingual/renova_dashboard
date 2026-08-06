import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PasswordToggleProps {
  inputType: string;
  onAction: () => void;
}
const PasswordToggle: React.FC<PasswordToggleProps> = ({
  inputType,
  onAction,
}) => {
  return (
    <span
      role="button"
      className="cursor-pointer"
    >
      {inputType === "text" ? (
        <EyeIcon className="text-black/50" onClick={() => onAction()} />
      ) : (
        <EyeOffIcon className="text-black/50" onClick={() => onAction()} />
      )}
    </span>
  );
};

export default PasswordToggle;
