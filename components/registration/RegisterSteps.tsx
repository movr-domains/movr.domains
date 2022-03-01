export default function RegisterSteps() {
  return (
    <div>
      <h3 className="text-2xl font-bold uppercase text-yellow mb-5">
        Steps to Register a Domain
      </h3>
      <ul className="mt-2 space-y-10">
        <li className="flex items-start space-x-3">
          <div>
            <span className="border px-2 py-1">1</span>
          </div>
          <div>
            <h5 className="text-green font-bold">Request to claim</h5>
            <p className="text-sm leading-none">
              Your wallet will open and you will be asked to confirm the first
              of two transaction required for registration. If the second
              tranaction is not processed within 7 days of the first, you will
              need to start again from step 1.
            </p>
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <div>
            <span className="border px-2 py-1">2</span>
          </div>
          <div>
            <h5 className="text-green font-bold">Wait for 1 minute</h5>
            <p className="text-sm leading-none">
              The waiting period is required to ensure another person has not
              tried to register the same name and protect you after your
              request.
            </p>
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <div>
            <span className="border px-2 py-1">3</span>
          </div>
          <div>
            <h5 className="text-green font-bold">Complete Registration</h5>
            <p className="text-sm leading-none">
              Click ‘register’ and your wallet will re-open. Only after the 2nd
              transaction is confirmed you will know if you got the name.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}