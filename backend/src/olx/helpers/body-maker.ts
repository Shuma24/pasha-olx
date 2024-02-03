import { IOlxAdvert, IOlxAttributes, IOlxImages } from '../interfaces';

const bodyMaker = (data: {
  title: string;
  description: string;
  advertiser_type: 'private' | 'business';
  images: IOlxImages[];
  price: number;
  state: string;
  type: string;
  size: string;
  year: string;
  quantity: number;
  brand: string;
}) => {
  let fixedType = '1';
  let fixedSize = data.size.split('/');
  let width = fixedSize[0];
  let height = fixedSize[1];
  let diameter = fixedSize[2];
  let fixedQuantity = 'pair';

  switch (data.type) {
    case 'summer':
      fixedType = '1';
      return;

    case 'winter':
      fixedType = '2';
      return;

    case 'allseason':
      fixedType = '3';
      return;

    default:
      break;
  }

  switch (data.quantity) {
    case 1:
      fixedQuantity = '1_tire_unpaired';
      return;

    case 2:
      fixedQuantity = 'pair';
      return;

    case 4:
      fixedType = 'set_of_4';
      return;

    default:
      break;
  }

  const attributes: IOlxAttributes[] = [
    {
      code: 'state',
      value: data.state,
    },
    {
      code: 'season',
      value: fixedType,
    },
    {
      code: 'width',
      value: width,
    },
    {
      code: 'height',
      value: height,
    },
    {
      code: 'diameter30',
      value: diameter,
    },
    {
      code: 'function',
      value: '1',
    },
    {
      code: 'year_made',
      value: data.year,
    },
    {
      code: 'quantity',
      value: fixedQuantity,
    },
    {
      code: 'tires_manufacturer',
      value: data.brand,
    },
    {
      code: 'speed_index"',
      value: 'v_240',
    },
  ];

  const body: IOlxAdvert = {
    title: data.title,
    description: data.description,
    category_id: 1459,
    advertiser_type: data.advertiser_type,
    contact: {
      name: 'Pavel',
    },
    location: {
      city_id: 176,
      district_id: 127,
      latitude: 49.83524,
      longitude: 24.03517,
    },
    images: data.images,
    price: {
      value: data.price,
      currency: 'UAH',
      negotiable: false,
      trade: false,
      budget: false,
    },
    attributes: attributes,
  };

  return body;
};
