import { storage } from '@/app/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface handleUploadProps {
  selectedFile: any;
  collectionName: string;
}

export const handleUpload = async ({ selectedFile, collectionName }: handleUploadProps) => {
  try {
    // ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
    const imageRef = ref(storage, `${collectionName}/${selectedFile?.name}`);
    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
  } catch (error) {
    console.log(error);
    return null;
  }
};
