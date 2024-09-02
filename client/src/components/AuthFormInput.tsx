import { VscError } from "react-icons/vsc";
import { AuthFormInputProps } from "../utils/interfaces/props/AuthFormInputProps";

const AuthFormInput = ({ type, placeholder, value, onChange, loading }: AuthFormInputProps) => {
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
