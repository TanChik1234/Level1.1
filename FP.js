let csvText = "44.38,34.33,Алушта,31440,\n49.49,30.17,Біла Церква,200131,\n49.54,28.49,Бердичів,87575,#некомент\n\n#\n46.49,36.58,#Бердянськ,121692,\n49.15,28.41,Вінниця,356665,\n#45.40,34.29,Джанкой,43343,";
let cityReplacementFunc = createCityReplacementFunc(csvText);
let inputText = "Алушта\nВінниця\nЕнергодар"
console.log(cityReplacementFunc(inputText));


/**
 * The function takes text in CSV format, processes it, and returns a 
 * function that replaces city names in the input string with a string 
 * of the following format: "city name(Xth place int the TOP-10 largest
 * cities in Ukraine, population YYYYY people)". 
 * @param {string CSV} cities text in CSV format with coordinates, name
 * and population count
 * @returns a function that replaces city names in the input string with
 *  a string of the following format: "city name(Xth place int the TOP-10
 * largest cities in Ukraine, population YYYYY people)".
 */
function createCityReplacementFunc(cities){
  if(!createCityReplacementFunc[cities]){
    createCityReplacementFunc[cities] =  cities.split("\n")
                                  .map(createObjectCity)
                                  .filter(filterCities)
                                  .sort(sorterCities)
                                  .slice(0,10)
                                  .reduce(getOneObject,{});
  };

  return (str) => {
    Object.keys(createCityReplacementFunc[cities]).forEach(cityName => {
      str = str.replaceAll(cityName+"", citySentence(createCityReplacementFunc[cities], cityName))
    });;
    return str;
  } 
}

/**
 * The function creates an object based on the input string with all the 
 * information about a city
 * @param {string} city String with city information: coordinates, name,
 * population
 * @returns The object contains the following properties: x and y (coordinates),
 * name, population
 */
function createObjectCity(cityInformation){
  if(cityInformation.includes("#")){
    let indexComent = cityInformation.indexOf("#");
    cityInformation=cityInformation.substring(0,indexComent);
  }
  let arr = cityInformation.split(",");
  return {
    x: arr[0],
    y: arr[1],
    name: arr[2],
    population: arr[3],
  };
}

/**
 * The function checks if all the required properties have values.
 * @param {object} city The object contains the following properties: 
 * x and y (coordinates), name, population
 * @returns a boolean result of the check
 */
function filterCities(city){
  return city.x!="" && city.y!=undefined && 
    city.name != undefined && city.population != undefined;
}

/**
 * The function compares two objects based on the "population" property.
 * If the value of the population property in the first object is less 
 * than the second object, it returns a positive number 1. Otherwise, it
 * returns -1;
 * @param {object} firstCity The object contains the following properties: 
 * x and y (coordinates), name, population
 * @param {object} secondCity The object contains the following properties: 
 * x and y (coordinates), name, population
 * @returns 1 if the value of the "population" property in the first 
 * object is less than that of the second object, otherwise -1
 */
function sorterCities(firstCity, secondCity){
  return +firstCity.population < +secondCity.population ? 1 : -1;
}

/**
 * The function is designed to be used in the reduce() method/ It adds
 * information about a specific city to the main object, assigning a
 * certain rating to that city
 * @param {object} allCities The main object contains information about
 * all the cities
 * @param {object} city The object contains the following properties: 
 * x and y (coordinates), name, population
 * @returns The main object contains information about all the cities
 */
function getOneObject(allCities, city){
  if(!getOneObject.currentRating){
    getOneObject.currentRating = 1;
  }
  allCities[city.name] = {
    population: city.population,
    rating: getOneObject.currentRating++
  };
  return allCities;
}

/**
 * The function creates a string with information about the specified
 * city, formed based on the data from the passed object
 * @param {object} topCities The main object contains information 
 * about all the cities
 * @param {string} cityName City name
 * @returns formatted string with city information
 */
function citySentence(topCities, cityName){
  let rating = topCities[cityName].rating;
  let population = topCities[cityName].population;
  return `${cityName}(${rating} місце в ТОП-10 найбільших міст України ${population} чоловік)`; 
}