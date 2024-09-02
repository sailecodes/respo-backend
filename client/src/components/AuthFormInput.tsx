import { VscError } from "react-icons/vsc";
import { AuthFormInputProps } from "../utils/interfaces/props/AuthFormInputProps";

const AuthFormInput = ({ type, placeholder, value, onChange, hasErr }: AuthFormInputProps) => {
  return (
    <div className="auth-form-input">
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
      <div>{hasErr && <VscError />}</div>
    </div>
  );
};

export default AuthFormInput;
