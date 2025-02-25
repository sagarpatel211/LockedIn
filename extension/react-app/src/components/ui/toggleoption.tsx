import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id}>{label}</Label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
};

export default ToggleOption;
