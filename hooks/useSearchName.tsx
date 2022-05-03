import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useSearchName(searchedName?: string) {
  const [validName, setValidName] = useState('');
  const [valid, setValid] = useState(false);
  const [error, setError] = useState<null | string>();

  const router = useRouter();

  useEffect(() => {
    if (searchedName) {
      const validated = validate(searchedName, false);

      if (validated.error) {
        setError(validated.error);
      }

      if (validated.name && validated.valid) {
        setValid(true);
        setValidName(validated.name);
      }
    }
  }, [searchedName]);

  const validate = (name: string, search: boolean = true) => {
    let error;
    let valid = false;
    let validatedName = name.trim();

    const splitPeriods = validatedName.split('.');

    if (splitPeriods.length == 1) {
      if (!search) {
        error = `The name ${validatedName} is not a valid MDR name. Suffix must include .movr`;
      } else {
        validatedName = validatedName + '.movr';
        valid = true;
      }
    } else if (splitPeriods.length == 2) {
      valid = true;
      if (splitPeriods[1] != 'movr') {
        error = `TLD cannot be ${splitPeriods[1]}, it must be .movr`;
        valid = false;
      }
    } else if (splitPeriods.length <= 3) {
      error = `Cannot create subdomains from this form`;
      valid = false;
    }

    validatedName = validatedName.toLowerCase();

    return !error ? { name: validatedName, valid } : { error, valid };
  };

  const lookUp = (name: string) => {
    const validated = validate(name);

    if (validated.valid) {
      router.push(`/domain/${validated.name}/`);
    } else {
      setError(validated.error);
    }
  };

  return { valid, validName, error, lookUp };
}
