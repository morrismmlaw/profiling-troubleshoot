export interface Profile {
  id: number;
  attributes: {
    name: string;
    ssoid: string;
    academicInterests: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProfileResponse {
  data: Profile[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}