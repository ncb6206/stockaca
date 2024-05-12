export interface IPostData {
  userId: string;
  commentCount: number;
  content: string;
  parentFeedId: string;
  likeCount: number;
  photoUrl: string[];
  updatedAt: number;
  createdAt: number;
  hashedUserId: string;
}

export interface IPostId {
  postId: string;
}

export interface IPostListData {
  postId: string;
  post: IPostData;
}

export interface IPostCard extends IPostListData {
  parentPostUserId?: string;
}

export interface IPostSetting {
  userId: string;
  postId: string;
  parentPostId?: string;
  isCommentOwner?: boolean;
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

export interface IPostCommentProps {
  userId: string;
  postId: string;
}
