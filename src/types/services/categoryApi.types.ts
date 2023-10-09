export interface IResponseGetListCategory {
  id: number;
  name_category: string;
  lft: number;
  rght: number;
  tree_id: number;
  level: number;
  parent: number | null;
}

export interface IResquestPostCategory {
  name_category: string;
  parent: number | string | null;
}
