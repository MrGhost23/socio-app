type Props = {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (text: string) => void;
}

const Input: React.FC<Props> = ({ id, type, label, value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative">
      <label
        className="absolute -top-2 left-3 px-1 bg-white text-gray-500 text-sm font-bold tracking-wide"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
        id={id}
        type={type}
        value={value}
        onChange={handleInputChange}
        autoComplete='off'
      />
    </div>
  );
};

export default Input;