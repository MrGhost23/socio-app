type Props = {
  id: string;
  label: string;
  value: string;
  name?: string;
  placeholder?: string;
  onChange: (text: string) => void;
};

const Textarea: React.FC<Props> = ({
  id,
  label,
  value,
  placeholder,
  name,
  onChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange(event.target.value);

  return (
    <div className="relative">
      <label
        className="absolute -top-2 left-3 px-1 bg-white text-gray-500 text-sm font-bold tracking-wide dark:bg-primarylessDark dark:text-textLighter"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        className="appearance-none border border-gray-300 rounded w-full h-32 py-3 px-4 text-gray-700 leading-tight resize-none focus:outline-none focus:border-sky-500 dark:bg-primarylessDark dark:text-textLighter"
        id={id}
        value={value}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;
