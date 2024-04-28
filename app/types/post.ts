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

export interface IPostId {
  postId: string;
}
