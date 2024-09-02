import { VscError } from "react-icons/vsc";

interface AuthFormInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // err: boolean;
}

const AuthFormInput = ({ type, placeholder, value, onChange }: AuthFormInputProps) => {
  return (
    <div className="auth-form-input">
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
      <div>
        <VscError />
      </div>
    </div>
  );
};

export default AuthFormInput;
