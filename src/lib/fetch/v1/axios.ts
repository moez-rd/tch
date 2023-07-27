import Axios from 'axios';

const client = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  withCredentials: true,
  validateStatus: () => {
    return true;
  },
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export default client;
