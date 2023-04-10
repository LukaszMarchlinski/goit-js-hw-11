import axios from 'axios';
export { fetchImg };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '24543353-3824dfbf23e7b5ead533e5f72';

async function fetchImg(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response;
}
