export interface IOlxAdvert {
  title: string;
  description: string;
  category_id: number;
  advertiser_type: 'private' | 'business';
  contact: IOlxContact;
  location: IOlxLocation;
  images: IOlxImages[];
  price: IOlxPrice;
  attributes: IOlxAttributes[];
}

export interface IOlxContact {
  name: string;
  phone?: string;
}

export interface IOlxLocation {
  city_id: number;
  district_id: number;
  latitude: number;
  longitude: number;
}

export interface IOlxImages {
  url: string;
}

export interface IOlxPrice {
  value: number;
  currency: string;
  negotiable: boolean;
  trade: boolean;
  budget: boolean;
}

export interface IOlxAttributes {
  code: string;
  value: string;
  values?: string[];
}

export interface IAdvertOlxResponse {
  id: number;
  status: string;
  url: string;
  created_at: string;
  activated_at: string;
  valid_to: string;
  title: string;
  description: string;
  category_id: number;
  advertiser_type: string;
  external_id: null | string;
  external_url: null | string;
  contact: {
    name: string;
    phone: null | string;
  };
  location: {
    city_id: number;
    district_id: number;
    latitude: string;
    longitude: string;
  };
  images: {
    url: string;
  }[];
  price: {
    value: string;
    currency: string;
    negotiable: boolean;
    budget: boolean;
    trade: boolean;
  };
  salary: null | any;
  attributes: {
    code: string;
    value: string;
    values: null | any[];
  }[];
  courier: null | any;
}

export interface IListOlxAdvertsResponse {
  data: IAdvertOlxResponse[];
}
