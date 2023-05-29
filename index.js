/**
* @Module HaveANiceDay
* @author Valeriya Tokareva <tkrv.valery@gmail.com>
* @version 0.1.0
* @requires one-liner-joke
* @requires weather-js
* @description Запрашивает у пользователя город, выводит текущую погоду, прогноз на зватра
               и анекдот для поднятия настроения.
**/

// подключены все необходимые модули
const joke = require('one-liner-joke');
const weather = require('weather-js');
const readline = require('readline');
const question = "Please type in your city and country or region (i.e. Moscow, Russia):\n";

const chooseDegree = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Hello! ｡◕‿◕｡\nWhat a lovely day! Let's check weather!\n");

/**
 * @param {String} str строка, которую надо распарсить
 * @desc отделяет имя города, если были введены несколько слов
**/
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

chooseDegree.question('Do you prefer Celcius or Fahrenheit degree? Type C or F only\n', (answer) => {
  let degree = 'C';
  if (answer && answer === 'c' || answer === 'C' || answer === 'F' || answer === 'f'){
    degree = answer.toUpperCase();
  }
  chooseDegree.close();
  showWeather(degree);
});

/**
* @param {String} degree температурная шкала
**/
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
    chooseCity.close();
  });
}