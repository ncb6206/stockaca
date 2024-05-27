export interface IPostId {
  postId: string;
}

export interface IPostParams {
  postId: string;
  userId: string;
}

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

export interface IPostListData {
  postId: string;
  post: IPostData;
}

export interface IPostCard {
  postData: IPostListData;
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
