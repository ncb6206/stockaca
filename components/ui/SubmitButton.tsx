import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type SubmitButtonProps = {
  isSubmitting: boolean;
  label: string;
  className?: string;
};

const SubmitButton = ({
  isSubmitting,
  label,
  className,
}: SubmitButtonProps) => {
  if (isSubmitting) {
    return (
      <Button className={className} disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {label} 중...
      </Button>
    );
  }

  return (
    <Button type="submit" className={className}>
      {label}
    </Button>
  );
};

export default SubmitButton;
