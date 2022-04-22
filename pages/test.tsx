import Loading from '@components/ui/Loading';
import { getResolver } from '@lib/contract';
import { useEffect } from 'react';

export default function TestPage() {
  useEffect(() => {
    async function fetch() {
      console.log(await getResolver());
    }
    fetch();
  }, []);

  return (
    <div>
      <p>Hi</p>
    </div>
  );
}
