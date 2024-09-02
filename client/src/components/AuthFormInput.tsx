import { VscError } from "react-icons/vsc";

interface AuthFormInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasErr: boolean;
}

const AuthFormInput = ({ type, placeholder, value, onChange, hasErr }: AuthFormInputProps) => {
  return (
    <div className="auth-form-input">
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
      <div>{hasErr && <VscError />}</div>
    </div>
  );
};

export default AuthFormInput;
