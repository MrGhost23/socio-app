type Props = {
  id: string;
  type: string;
  label: string;
  value: string;
  name?: string;
  placeholder?: string;
  onChange: (text: string) => void;
};

const Input: React.FC<Props> = ({
  id,
  type,
  label,
  value,
  placeholder,
  name,
  onChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);
  return (
    <div className="relative">
      <label
        className="absolute -top-2 left-3 px-1 bg-white text-gray-500 text-sm font-bold tracking-wide"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
        id={id}
        type={type}
        value={value}
        name={name}
        onChange={handleInputChange}
        autoComplete="off"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
