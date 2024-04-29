export interface IPostData {
  userId: string;
  commentCount: number;
  content: string;
  likeCount: number;
  photoUrl: string[];
  updatedAt: number;
  createdAt: number;
}

export interface IPostListData {
  postId: string;
  post: IPostData;
}

export interface IPostSetting {
  userId: string;
  postId: string;
}

export interface IPostInputs {
  photoUrl: FileList;
  content: string;
}

export interface IUpdatePost {
  photoUrl: string[];
  content: string;
  updatedAt: number;
}
