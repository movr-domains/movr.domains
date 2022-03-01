import { Input } from ".";

type Field = { [key: string]: string };

interface InputGroupProps {
  title: string;
  fields: { [key: string]: string };
  setFields: (fields: Field) => void;
}

export default function InputGroup({
  title,
  fields,
  setFields,
}: InputGroupProps) {
  return (
    <div>
      <h2 className="text-xl uppercase font-bold">{title}</h2>
      <div className="border border-green border-opacity-10 py-5">
        {fields &&
          Object.entries(fields).map(([key, value]) => (
            <div key={key}>
              <Input
                name={key}
                value={value}
                changeEvent={(v) => {
                  setFields({ ...fields, [key]: v });
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
