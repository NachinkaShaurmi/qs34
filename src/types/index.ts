export interface IUser {
  id: string | number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface ITodo {
  id: string | number;
  title: string;
  completed: boolean;
  user: IUser;
}

export interface ITodosPage {
  todos: {
    data: ITodo[];
    meta: {
      totalCount: number;
    };
  };
}
