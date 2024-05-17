import RotateLoader from 'react-spinners/RotateLoader';

const Loader = () => {
  return (
    <div className="my-4 flex flex-col items-center justify-center">
      <RotateLoader color="#9333ea" size={15} />
    </div>
  );
};

export default Loader;
