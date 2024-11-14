export interface User {
  begin_at: string;
  blackholed_at: string;
  created_at: string;
  cursus: {
    id: number;
    created_at: string;
    name: string;
    slug: string;
    kind: string;
  };
  cursus_id: number;
  end_at: string | null;
  grade: string;
  has_coalition: boolean;
  id: number;
  level: 0;
  skills: string[];
  updated_at: string;
  user: {
    active?: boolean;
    alumni?: boolean;
    alumnized_at: string | null;
    anonymize_date: string;
    correction_point: number;
    created_at: string;
    data_erasure_date: string;
    displayname: string;
    email: string;
    first_name: string;
    id: number;
    image: {
      link: string;
      versions: {
        large: string;
        medium: string;
        small: string;
        micro: string;
      };
    };

    kind: string;
    last_name: string;
    location: string | null;
    login: string;
    phone: number | string;
    pool_month: string;
    pool_year: string;
    staff?: boolean;
    updated_at: string;
    url: string;
    usual_first_name: string | null;
    usual_full_name: string;
    wallet: number;
  };
}

// export interface User {
//   id: number;
//   begin_at: string;
//   end_at: string | null;
//   grade: string;
//   level: number;
//   skills: string[];
//   cursus_id: number;
//   has_coalition: boolean;
//   user: {
//     id: number;
//     login: string;
//     url: string;
//   };
//   cursus: {
//     id: number;
//     created_at: string;
//     name: string;
//     slug: string;
//   };
// }
