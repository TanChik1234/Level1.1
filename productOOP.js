/**
 *  Constructor function abstract class for creating "Product" objects with 
 * specific properties and functions
 * @param {string} name Product name
 * @param {string} description Product description
 * @param {float} price Price of one unit of the product
 * @param {string} brand Product brand name
 * @param {integer} quantity Available quantity of the product
 * @param {Array of string} images Array of product images
 */
function AbstractProduct(name, description, price, brand, quantity, images){
  if (this.constructor === AbstractProduct) {
    throw new Error("Cannot instantiate abstract class");
  }

  if (
    !(
      typeof name === "string" &&
      typeof description === "string" &&
      typeof price === "number" &&
      typeof brand === "string" &&
      typeof quantity === "number" &&
      Array.isArray(images)
    )
  ) {
    throw new Error("Invalid data type entered.");
  }
  this.ID = Math.random().toString(36).substring(2, 10);
  this.name = name;
  this.description = description;
  this.price = price;
  this.quantity = quantity;
  this.reviews = [];
  this.images = images;
  this.date = new Date();
  this.brand = brand;
}

/**
 * The method that returns information about an object's properties and their
 *  values in the form of a multiline expression.
 * @returns Multiline expression with information about the properties and 
 * their values.
 */
AbstractProduct.prototype.getFullInformation = function(){
  let information = "";
  for(let property in this){
    if(typeof this[property] === "function"){
      continue;
    }
    let line = `${property}:\t${this[property]}\n`;
    information+=line;
  }
  return information.substring(0, information.length-1);
};

/**
 * A method that calculates the cost of a certain quantity of a 
 * product, returning the value as a formatted string "$0.00".
 * @param {integer} quantity the quantity of the product
 * @returns the cost of a certain quantity of products 
 */
AbstractProduct.prototype.getPriceForQuantity = function(quantity){
  return `$${(quantity*this.price).toFixed(2)}`;
}

/**
 * A universal getter for retrieving the value of a specified property
 * @param {string} nameProperty  the name of the property
 * @returns the value of the specified property 
 */
AbstractProduct.prototype.getProperty = function(nameProperty){
  return this[nameProperty];
}

/**
 * A universal setter for replacing the value of a specified property
 * @param {string} nameProperty the name of the property
 * @param {type of property} newValue the new value of the property
 */
AbstractProduct.prototype.setProperty = function(nameProperty, newValue){
  if(!(typeof this[nameProperty] === typeof newValue)){
    throw new Error("Incompatible types");
  }
  this[nameProperty] = newValue;
}

/**
 * The method returns a review for a specific identifier.
 * @param {string} ID  unique identifier
 * @returns  unique identifier
 */
AbstractProduct.prototype.getReviewByID = function(ID){
  for (let review of this.reviews) {
    if (review.ID === ID) {
      return review;
    }
  }
  return undefined;
}

/**
 * The method returns one of the product images.
 * @param {number} parametr  image index
 * @returns  image by a specific index or the first image if the parameter 
 * is not specified.
 */
AbstractProduct.prototype.getImage = function(parametr){
  return this.images[parametr];
}

/**
 * The method creates a new review and adds it to the array of reviews.
 * @param {string} ID Unique identifier of the review
 * @param {string} author Author's name
 * @param {string} date Date of the review
 * @param {string} comment Comment
 * @param {rating} ratingService Rating for service (from 0 to 5)
 * @param {rating} ratingPrice Rating for price (from 0 to 5)
 * @param {rating} ratingValue Rating for value (from 0 to 5)
 * @param {rating} ratingQuality Rating for quality (from 0 to 5) 
 */
AbstractProduct.prototype.addReview = function(ID, author, date, comment,
   ratingService, ratingPrice, ratingValue, ratingQuality){
    this.reviews.push(
      new Review( ID, author, date, comment, ratingService, ratingPrice, 
        ratingValue, ratingQuality)
    );  
}

/**
 * The method removes the review with the specified ID.
 * @param {string} ID  review identifier
 */
AbstractProduct.prototype.deleteReview = function(ID){
  for (let i = 0; i < this.reviews.length; i++) {
    if (this.reviews[i].ID === ID) {
      this.reviews.splice(i, 1);
      return;
    }
  }
}

/**
 * The method calculates and returns the average rating of the product.
 * @returns average rating of the product
 */
AbstractProduct.prototype.getAverageRating = function(){
  let sumRating = 0;
    for (let i = 0; i < this.reviews.length; i++) {
      sumRating +=
        (this.reviews[i].rating["service"] +
          this.reviews[i].rating["price"] +
          this.reviews[i].rating["value"] +
          this.reviews[i].rating["quality"]) /
        4;
    }
    return sumRating / this.reviews.length;
}


/**
 * The constructor function for creating a "Clothes" object 
 * with specific properties. Inherits from the AbstractProduct class.
 * @param {string} name Product name
 * @param {string} description Product description
 * @param {float} price Price of one unit of the product
 * @param {string} brand Product brand name
 * @param {integer} quantity Available quantity of the product
 * @param {array of string} images Array of product images
 * @param {string} material The material of the product
 * @param {string} color The color of the product
 */
function Clothes(name, description, price, brand, quantity, images, material, color){
  AbstractProduct.call(this, name, description, price, brand, quantity, images);
  this.material = material;
  this.color = color;
}

Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;

/**
 * The constructor function for creating an "Electronics" 
 * object with specific properties. Inherits from the AbstractProduct class.
 * @param {string} name Product name
 * @param {string} description Product description
 * @param {float} price Price of one unit of the product
 * @param {string} brand Product brand name
 * @param {integer} quantity Available quantity of the product
 * @param {array of string} images Array of product images
 * @param {string} warranty The warranty of the product
 * @param {string} power The power of the product
 */
function Electronics(name, description, price, brand, quantity, images, warranty, power){
  AbstractProduct.call(this, name, description, price, brand, quantity, images);
  this.warranty = warranty;
  this.power = power;
}

Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;


/**
 * Constructor function for creating "Reviews" objects
 * @param {string} ID Unique identifier of the review
 * @param {string} author Author's name
 * @param {string} date Date of the review
 * @param {string} comment Comment
 * @param {rating} ratingService Rating for service (from 0 to 5)
 * @param {rating} ratingPrice Rating for price (from 0 to 5)
 * @param {rating} ratingValue Rating for value (from 0 to 5)
 * @param {rating} ratingQuality Rating for quality (from 0 to 5) 
 */
function Review(ID, author, date, comment, ratingService, ratingPrice, ratingValue, 
  ratingQuality ) {
  if (
    !(
    typeof ID === "string" &&
    typeof author === "string" &&
    typeof date === "string" &&
    typeof comment === "string" &&
    typeof ratingService === "number" &&
    typeof ratingPrice === "number" &&
    typeof ratingValue === "number"
    ) &&
    typeof ratingQuality === "number"
  ) {
  throw new Error("Invalid data type entered.");
  }
  this.ID = ID;
  this.author = author;
  this.date = new Date(date);
  this.comment = comment;
  this.rating = {
  service: adjustRating(ratingService),
  price: adjustRating(ratingPrice),
  value: adjustRating(ratingValue),
  quality: adjustRating(ratingQuality),
  };

  /**
   * The function adjusts the specified rating to fit within the range of 0-5.
   * If the passed number is less than 0, it returns 0. If it is greater than 5, it returns 5.
   * In other cases, it returns the number that was passed as input.
   * @param {number} rating Rating in numerical format
   * @returns Rating within the range of 0-5 
  */
  function adjustRating(rating){
    if (rating < 0) return 0;
    if (rating > 5) return 5;
    return rating;
  }
}


/**
 * A universal getter for retrieving the value of a specified property
 * @param {string} nameProperty  the name of the property
 * @returns the value of the specified property 
 */
Review.prototype.getProperty = function(nameProperty){
  return this[nameProperty];
}

/**
 * A universal setter for replacing the value of a specified property
 * @param {string} nameProperty the name of the property
 * @param {type of property} newValue the new value of the property
 */
Review.prototype.setProperty = function(nameProperty, newValue){
  if(typeof this[nameProperty] !== typeof newValue){
    throw new Error("Incompatible types");
  }
  this[nameProperty] = newValue;
}

/**
 * Function for searching Products whose name or description contains a specific string
 * @param {array of Products} products array of Products
 * @param {string} search string to search in the name or description
 * @returns array of Products that have a match with the specified string in the name 
 * or description
 */
function searchProducts(products, search){
  if(!(products instanceof AbstractProduct)){
    throw new Error("Incompatible types");
  }
  search = search.toLowerCase();
  return products.filter(product => {
    let name = product.getProperty("name").toLowerCase();
    let description = product.getProperty("description").toLowerCase();
    return name.includes(search) || description.includes(search);
  });
}

/**
 * Function for sorting Products by price, name, or ID. If a different sort rule is 
 * specified, the array remains unchanged.
 * @param {array of Products} products array of Products
 * @param {string} sortRule  rule by which the array is sorted
 * @returns sorted array of Products
 */
function sortProducts(products, sortRule){
  if(!(products instanceof AbstractProduct)){
    throw new Error("Incompatible types");
  }
  if(sortRule != "name" && sortRule != "price" && sortRule != "ID"){
    return products;
  }
  return products.sort((a, b) => {
    return a.getProperty(sortRule) > b.getProperty(sortRule) ? 1 : -1;
  });
}


let shirt = new Clothes("Shirt", "A blue shirt", 15.30, "MyClothesBrand", 5, ["image 1"], "Syntetic", "Blue");
testFunction(shirt);


/**
 * The function calls the testing of all functions of an object created using
 * the Product constructor.
 * @param {Product} product An object created using the Product constructor
 */
function testFunction(product){
  if(!(product instanceof AbstractProduct)){
    throw new Error("Incompatible types");
  }
  testSettersAndGetters(product);
  testAnotherFunctions(product);
}

/**
 * The function calls the testing of all getters and setters of an object created using
 * the Product constructor.
 * @param {Product} product An object created using the Product constructor 
 */
function testSettersAndGetters(product){
  let partName = "Setter and Getter "
  product.setProperty("ID","245s62");
  showRezultTest(product.getProperty("ID") === "245s62", partName+"ID");

  product.setProperty("name","Shirt");
  showRezultTest(product.getProperty("name") === "Shirt", partName+"name");

  product.setProperty("description","Pretty shirt");
  showRezultTest(product.getProperty("description",) === 
                "Pretty shirt", partName+"description");

  product.setProperty("price", 520.35);
  showRezultTest(product.getProperty("price") === 520.35, partName+"price");

  product.setProperty("brand","Guchi");
  showRezultTest(product.getProperty("brand") === "Guchi", partName+"brand");

  product.setProperty("quantity",24);
  showRezultTest(product.getProperty("quantity") === 24, partName+"quantity");

  product.setProperty("date", new Date("2023-09-11 10:10:10"));
  showRezultTest(product.getProperty("date").toLocaleString("uk-UA") === 
                "11.09.2023, 10:10:10", partName+"date");

  let newReview = new Review("52", "Anna", "2023-09-11 10:10:10", 
                            "Any comment", 5, 2, 5, 7);
  product.setProperty("reviews",[newReview,]);
  showRezultTest(JSON.stringify(product.getProperty("reviews")) === 
                JSON.stringify([newReview,]), partName+"reviews");

  product.setProperty("images", ["images1"]);
  showRezultTest(JSON.stringify(product.getProperty("images")) === 
                JSON.stringify(["images1"]), partName+"images");

  product.setProperty("material", "silk");
  showRezultTest(product.getProperty("material") === "silk", partName+"material");

  product.setProperty("color", "pink");
  showRezultTest(product.getProperty("color") === "pink", partName+"color");
}


/**
 * The function calls the testing of all functions except getters and setters of an 
 * object created usingthe Product constructor.
 * @param {Product} product An object created using the Product constructor 
 */
function testAnotherFunctions(product){
  showRezultTest(JSON.stringify(product.getReviewByID("52")) === 
                JSON.stringify(new Review("52", "Anna", "2023-09-11 10:10:10", 
                "Any comment", 5, 2, 5, 7),), "Get review by ID");

  showRezultTest(product.getImage(0) === "images1", "Get index");

  newReview = new Review("12", "Tom", "2023-05-03 11:03:24", "Very Good", 1, 2, 3, 4);
  product.addReview("12", "Tom", "2023-05-03 11:03:24", "Very Good", 1, 2, 3, 4);
  product.deleteReview("52");
  showRezultTest(JSON.stringify(product.getProperty("reviews")) === 
                JSON.stringify([newReview,]), "Add and delete review");

  showRezultTest(product.getAverageRating() === 2.5, "Get average rating");
}

/**
 * The function outputs the test results for monitoring.
 * @param {boolean} result The boolean result of the test
 * @param {string} nameTest The name of the test
 */
function showRezultTest(result, nameTest){
  console.log(result  + "\t" + nameTest);
}