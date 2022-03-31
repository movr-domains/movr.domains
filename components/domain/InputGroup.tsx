import { Input } from '.';
import { MdNotes } from 'react-icons/md';

type Field = { [key: string]: string };

interface InputGroupProps {
  title: string;
  fields: { [key: string]: string };
  setFields: (fields: Field) => void;
  icon: any;
}

export default function InputGroup({
  title,
  fields,
  setFields,
  icon,
}: InputGroupProps) {
  return (
    <div className='p-5'>
      <div className='flex text-white items-center justify-between'>
        <div className='flex items-center space-x-2'>
          {icon}
          <h2 className='text-3xl uppercase font-bold'>{title}</h2>
        </div>
        <div>edit</div>
      </div>
      <div className='space-y-1'>
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
