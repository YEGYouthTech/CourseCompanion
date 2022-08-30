// import PulseLoader from 'react-spinners/PulseLoader';
import Loader from './Loader';

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      {/* <PulseLoader size={20} color={'#ededed'} loading={true} /> */}
      <Loader />
    </div>
  );
}
