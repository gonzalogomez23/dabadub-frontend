// export type Post = {
//   slug: string;
//   title: string;
//   description: string;
//   image?: string;
//   category?: PostCategory;
// }

export interface PostCategory {
  id: number;
  title: string;
  slug: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
  image?: string;
  category?: PostCategory;
}

export interface PostFormData {
    title: string;
    description: string;
    content: string;
    category_id: number | string | null;
    published: boolean;
    image?: string | File;
    _method?: 'PUT';
}

export interface User {
  id: number;
  name: string;
  email: string;
  // created_at: string;
  // updated_at: string;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  message: string;
  type: NotificationType;
}