import { Input } from '.';
import { MdNotes } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { TextRecords } from 'constants/types';

interface Field {
  [key: string]: string;
}

interface InputGroupProps {
  title: string;
  fields: { [key: string]: string };
  setFields: (fields: Field) => void;
  icon: any;
  setCurrentFields: (fields: TextRecords) => void;
  updateRecords: () => void;
}

export default function InputGroup({
  title,
  fields,
  setFields,
  icon,
  setCurrentFields,
  updateRecords,
}: InputGroupProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      setCurrentFields(fields);
    }
  }, [active]);

  return (
    <div className='p-5'>
      <div className='flex text-white items-center justify-between'>
        <div className='flex items-center space-x-2'>
          {icon}
          <h2 className='text-3xl uppercase font-bold'>{title}</h2>
        </div>
        <div>
          <span
            className='block uppercase font-bold text-sm tracking-wider cursor-pointer'
            onClick={() => setActive(!active)}
          >
            {!active ? 'edit' : 'editing'}
          </span>
        </div>
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
                disabled={!active}
              />
            </div>
          ))}
      </div>
      {active && (
        <div className='flex justify-end'>
          <button
            className='btn uppercase font-bold'
            onClick={() => updateRecords()}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}
