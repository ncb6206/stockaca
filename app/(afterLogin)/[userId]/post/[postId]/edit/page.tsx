import { IPostParams } from '@/app/_types/post';
import EditForm from '@/app/_components/common/EditForm';

interface EditPageProps {
  params: IPostParams;
}

const EditPage = ({ params }: EditPageProps) => {
  const { userId, postId } = params;

  return <EditForm userId={userId} postId={postId} />;
};

export default EditPage;
