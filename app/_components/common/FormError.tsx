import { FieldError } from 'react-hook-form';

const FormError = ({ error }: { error?: FieldError }) => {
  if (!error) return null;

  return <p className="mt-2 text-red-600">{error.message}</p>;
};

export default FormError;
