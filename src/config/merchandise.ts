export const merchandiseOptions = {
  // url: "https://api.sheetmonkey.io/form/dBWs6NtvKA7JZVAwDeoTwA",
  url: 'https://script.google.com/macros/s/AKfycbzBq2Cad32O5W2uVCL97RiuaTZkEvoSpwWzSOrfHn33g7Vn8YeVjoYm556LHf9aR73J/exec',
};

export interface Merchandise {
  name: string;
  price: {
    value: number;
    pcs: number;
  }[];
  variants: {
    name: string;
    image: string;
  }[];
}

export const merchandises: Merchandise[] = [
  {
    name: 'Gantungan Kunci Acrylic',
    price: [
      {
        value: 8000,
        pcs: 1,
      },
      {
        value: 15000,
        pcs: 2,
      },
    ],
    variants: [
      {
        name: 'Lady Tifa',
        image: '/images/merchandise/keychain_lady_tifa.png',
      },
    ],
  },
  {
    name: 'Button Pin',
    price: [
      {
        value: 8000,
        pcs: 1,
      },
      {
        value: 15000,
        pcs: 2,
      },
    ],
    variants: [
      {
        name: 'Lady Tifa',
        image: '/images/merchandise/button_pin_lady_tifa.jpg',
      },
      {
        name: 'Technofest',
        image: '/images/merchandise/button_pin_technofest.png',
      },
    ],
  },
  {
    name: 'Stiker',
    price: [
      {
        value: 2000,
        pcs: 1,
      },
      {
        value: 5000,
        pcs: 4,
      },
    ],
    variants: [
      {
        name: 'Mahardika Abhipraya',
        image: '/images/merchandise/sticker_mahardika_abhipraya.jpg',
      },
      {
        name: 'Lady Tifa',
        image: '/images/merchandise/sticker_lady_tifa.jpg',
      },
      {
        name: 'Technofest #1',
        image: '/images/merchandise/sticker_technofest_1.jpg',
      },
      {
        name: 'Technofest #2',
        image: '/images/merchandise/sticker_technofest_2.jpg',
      },
    ],
  },
];
