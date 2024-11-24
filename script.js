const API_URL = 'https://university-college-list-and-rankings.p.rapidapi.com/api/top-universities/northamerica';
const RAPIDAPI_KEY = 'cc92da49c8mshc04895ab9bcac6ap19f106jsn991e480c7b71'; // Ваш API-ключ

// Функция для получения данных об университетах и отображения их
async function fetchAndDisplayUniversities(searchQuery = '') {
  const listElement = document.getElementById('university-list'); // Элемент для вывода списка университетов
  listElement.innerHTML = '<li>Loading...</li>'; // Идентификатор загрузки

  try {
    // Отправка запроса на API
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'university-college-list-and-rankings.p.rapidapi.com',
        'x-rapidapi-key': RAPIDAPI_KEY,
      },
    });

    // Проверка успешности запроса
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Преобразование ответа в JSON
    const data = await response.json();
    console.log('API Response:', data); // Для проверки структуры данных

    // Фильтрация данных на основе поискового запроса
    const universities = searchQuery
      ? data.filter((university) =>
          university.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data;

    // Если университеты не найдены
    if (universities.length === 0) {
      listElement.innerHTML = '<li>No universities found.</li>';
      return;
    }

    // Отображение списка университетов
    listElement.innerHTML = universities
      .map(
        (university) => `
        <li>
          <h3>${university.name}</h3>
          <p>Rank: ${university.rank}</p>
          <p>Country: ${university.country}</p>
        </li>`
      )
      .join('');
  } catch (error) {
    console.error('Error fetching universities:', error); // Логирование ошибки
    listElement.innerHTML = '<li>Error loading universities. Please try again later.</li>';
  }
}

// Добавление слушателя на кнопку поиска
document.getElementById('search-button').addEventListener('click', () => {
  const searchInput = document.getElementById('search-input').value;
  fetchAndDisplayUniversities(searchInput); // Вызов функции с поисковым запросом
});

// Загрузка университетов при загрузке страницы
fetchAndDisplayUniversities();
