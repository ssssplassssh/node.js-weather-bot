// Підключені всі необхідні модулі 
const joke = require('one-liner-joke');
const weather = require('weather-js');
const readline = require('readline');

// Задаються початкові значення змінних. Змінна question містить текст запиту для введення міста і країни або регіону користувачем.

const question = "Please type in your city and country or region (i.e. Kiev, Ukraine):\n";

// Створюється інтерфейс chooseDegree для отримання відповіді користувача щодо вибору шкали температури (Celsius або Fahrenheit). Інтерфейс використовує readline для зчитування введення з консолі
const chooseDegree = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Виводиться привітальне повідомлення
console.log("Hello! ｡◕‿◕｡\nWhat a lovely day! Let's check weather!\n");

/**
 * @param {String} str рядок, який треба розпарсити
 * @desc відділяє ім'я міста, якщо було введено кілька слів
**/

// Оголошується функція parseUserAnswer, яка приймає рядок str і розбиває його на ім'я міста, якщо введено кілька слів. Це робиться за допомогою роздільника ", ". Функція повертає розпарсене ім'я міста з великої літери
function parseUserAnswer(str) {
  let result = '';
  let cityName = str;
  let separator = ', ';
  if (str.indexOf(', ') > 0) {
    const strArr = str.split(separator);
    cityName = strArr[0];
  }
  result = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  return result;
}

// Використовуючи інтерфейс chooseDegree, запитується у користувача, яку шкалу температури він вибирає (Celsius або Fahrenheit). Введення користувача зчитується, перевіряється та зберігається у змінну degree
chooseDegree.question('Do you prefer Celcius or Fahrenheit degree? Type C or F only\n', (answer) => {
  let degree = 'C';
  if (answer && answer === 'c' || answer === 'C' || answer === 'F' || answer === 'f'){
    degree = answer.toUpperCase();
  }

  // Викликається функція close() для закриття інтерфейсу chooseDegree, оскільки більше він не потрібний
  chooseDegree.close();

  // Викликається функція showWeather(degree), яка приймає шкалу температури і відображає погоду
  showWeather(degree);
});

/**
* @param {String} degree температурна шкала
**/

// Оголошується функція showWeather, яка приймає змінну degree (шкалу температури) і відображає погоду для введеного міста. Вона створює інтерфейс chooseCity для отримання введення міста користувачем і запитує у нього місто та країну або регіон
function showWeather (degree) {
  const chooseCity = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  chooseCity.question(question, (answer) => {
    if (answer && answer !== ' '){
      const city = parseUserAnswer(answer);
      let randomJoke = joke.getRandomJoke();
      console.log(`Excelent! We are checking the weather in ${city} now.\n(∩｀-´)⊃━☆ﾟ.*･｡ﾟ`);

      // У функції showWeather перевіряється, чи було введено місто користувачем, і якщо так, то виконується запит до модуля weather-js, щоб отримати погоду для введеного міста. Після цього виводиться інформація про погоду, а також випадковий анекдот дня
      weather.find({search: answer, degreeType: degree}, function(err, result) {
        if(err || result.length === 0) {
          console.log(`There is something wrong with your request. Please try again later`);
        } else {
          console.log(`There is ${result[0].current.temperature} in ${city}. Feels like ${result[0].current.feelslike}, ${result[0].current.skytext.toLowerCase()}.\nTomorrow will be ${result[0].forecast[0].low} - ${result[0].forecast[0].high}.\nJoke of the day:\n${randomJoke.body}\nHave a nice day!`);
        }
      });
    } else {
      console.log('Sorry, but you have not typed in your city name.');
    }

    // Закривається інтерфейс chooseCity
    chooseCity.close();
  });
}