import EditForm from '@/app/(afterLogin)/[userId]/post/[postId]/edit/_component/EditForm';

interface EditPageProps {
  params: { userId: string; postId: string };
}

const EditPage = ({ params }: EditPageProps) => {
  const { userId, postId } = params;

  return <EditForm userId={userId} postId={postId} />;
};

export default EditPage;
