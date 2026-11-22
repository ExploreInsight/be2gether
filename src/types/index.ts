export type UserLite = {
  id: string;
  name: string | null;
  username: string;
  image: string | null;
};

export type Track = {
  id: string;
  content: string | null;
  image: string | null;
  createdAt: string;
  author: UserLite;
  likeCount: number;
  commentCount: number;
  liked: boolean;
  saved: boolean;
  isDemo: boolean;
};

export type TrackComment = {
  id: string;
  content: string;
  createdAt: string;
  author: UserLite;
  canDelete: boolean;
};

export type TrackDetail = Track & { comments: TrackComment[]; canDelete: boolean };

export type Page<T> = { items: T[]; nextCursor: string | null };

export type Me = UserLite & { isAdmin: boolean };

export type Profile = UserLite & {
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: string;
  followers: number;
  following: number;
  posts: number;
  isFollowing: boolean;
  isMe: boolean;
  isDemo: boolean;
};

export type PersonRow = UserLite & { followers: number; isFollowing: boolean };

export type AlertItem = {
  id: string;
  type: "LIKE" | "COMMENT" | "FOLLOW";
  read: boolean;
  createdAt: string;
  creator: UserLite;
  postId: string | null;
  postSnippet: string | null;
  commentSnippet: string | null;
};

export type TagCount = { tag: string; count: number };

export type ReportRow = {
  id: string;
  reason: string;
  createdAt: string;
  reporter: UserLite;
  post: { id: string; content: string | null; author: UserLite };
};

export type Side = "friends" | "everyone";
