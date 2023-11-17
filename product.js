let firstProduct = new Product(
  "AT-shirt",
  "A red T-shirt",
  20.5,
  "MyBrand",
  "XL",
  4,
  ["image1", "image2"]
);
testFunction(firstProduct);

/**
 * Constructor function for creating "Product" objects with specific properties and functions
 * @param {string} name  Product name
 * @param {string} description Product description
 * @param {float} price Price of one unit of the product
 * @param {string} brand Product brand name
 * @param {string} activeSize  Active size of the product
 * @param {integer} quantity Available quantity of the product
 * @param {Array of Strings} images Array of product images
 */
function Product(name, description, price, brand, activeSize, quantity, images) {
  if (
    !(
      typeof name === "string" &&
      typeof description === "string" &&
      typeof price === "number" &&
      typeof brand === "string" &&
      typeof activeSize === "string" &&
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
  this.brand = brand;
  this.sizes = [activeSize.toUpperCase()];
  this.activeSize = activeSize.toUpperCase();
  this.quantity = quantity;
  this.date = new Date();
  this.reviews = [];
  this.images = images;

  this.getID = () => {
    return this.ID;
  };
  this.getName = () => {
    return this.name;
  };
  this.getDescription = () => {
    return this.description;
  };
  this.getPrice = () => {
    return this.price;
  };
  this.getBrand = () => {
    return this.brand;
  };
  this.getSizes = () => {
    return this.sizes;
  };
  this.getActiveSize = () => {
    return this.activeSize;
  };
  this.getQuantity = () => {
    return this.quantity;
  };
  this.getDate = () => {
    return this.date.toLocaleString("uk-UA");
  };
  this.getReviews = () => {
    return this.reviews;
  };
  this.getImages = () => {
    return this.images;
  };

  this.setID = (ID) => {
    this.ID = ID;
  };
  this.setName = (name) => {
    this.name = name;
  };
  this.setDescription = (description) => {
    this.description = description;
  };
  this.setPrice = (price) => {
    this.price = price;
  };
  this.setBrand = (brand) => {
    this.brand = brand;
  };
  this.setSizes = (sizes) => {
    for (let i = 0; i < sizes.length; i++) {
      sizes[i] = sizes[i].toUpperCase();
    }
    this.sizes = sizes;
  };
  this.setActiveSize = (activeSize) => {
    this.activeSize = activeSize.toUpperCase();
  };
  this.setQuantity = (quantity) => {
    this.quantity = quantity;
  };
  this.setDate = (date) => {
    this.date = new Date(date);
  };
  this.setReviews = (reviews) => {
    this.reviews = reviews;
  };
  this.setImages = (images) => {
    this.images = images;
  };

  this.getReviewByID = (ID) => {
    for (let review of this.reviews) {
      if (review.ID === ID) {
        return review;
      }
    }
    return undefined;
  };
  this.getImage = (parametr) => {
    return this.images[parametr];
  };
  this.addSize = (size) => {
    this.sizes.push(size.toUpperCase());
  };
  this.deleteSize = (size) => {
    size = size.toUpperCase();
    let index = 0;
    for (; index < this.sizes.length; index++) {
      if (this.sizes[index] === size) break;
    }
    this.sizes.splice(index, 1);
    if (size === this.activeSize && this.sizes.length != 0) {
      this.activeSize = this.sizes[0];
    }
  };
  this.addReview = (ID, author, date, comment, ratingService, ratingPrice, ratingValue, ratingQuality) => {
    this.reviews.push(
      new Review( ID, author, date, comment, ratingService, ratingPrice, ratingValue, ratingQuality)
    );
  };
  this.deleteReview = (ID) => {
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].ID === ID) {
        this.reviews.splice(i, 1);
        return;
      }
    }
  };
  this.getAverageRating = () => {
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
  };
}

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

  this.getID = () => {
    return this.ID;
  };
  this.getAuthor = () => {
    return this.author;
  };
  this.getDate = () => {
    return this.date.toLocaleString("uk-UA");
  };
  this.getComment = () => {
    return this.comment;
  };
  this.getRating = () => {
    return this.rating;
  };

  this.setID = (ID) => {
    this.ID = ID;
  };
  this.setAuthor = (author) => {
    this.author = author;
  };
  this.setDate = (date) => {
    this.date = date;
  };
  this.setComment = (comment) => {
    this.comment = comment;
  };
  this.setRating = (ratingService, ratingPrice, ratingValue, ratingQuality) => {
    this.rating.service = adjustRating(ratingService);
    this.rating.price = adjustRating(ratingPrice);
    this.rating.value = adjustRating(ratingValue);
    this.rating.quality = adjustRating(ratingQuality);
  };
  function adjustRating(rating) {
    if (rating < 0) return 0;
    if (rating > 5) return 5;
    return rating;
  }
}


/**
 * Function for searching Products whose name or description contains a specific string
 * @param {array of Products} products array of Products
 * @param {string} search string to search in the name or description
 * @returns array of Products that have a match with the specified string in the name 
 * or description
 */
function searchProducts(products, search){
  search = search.toLowerCase();
  return products.filter(product => {
    let name = product.getName().toLowerCase();
    let description = product.getDescription().toLowerCase();
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
  if(sortRule != "name" && sortRule != "price" && sortRule != "ID"){
    return products;
  }
  return products.sort((a, b) => {
    return a[sortRule] > b[sortRule] ? 1 : -1;
  })
}

/**
 * The function calls the testing of all functions of an object created using
 * the Product constructor.
 * @param {Product} product An object created using the Product constructor
 */
function testFunction(product){
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
  product.setID("245662");
  showRezultTest(product.getID() === "245662", partName+"ID");

  product.setName("Shirt");
  showRezultTest(product.getName() === "Shirt", partName+"name");

  product.setDescription("Pretty shirt");
  showRezultTest(product.getDescription() === "Pretty shirt", partName+"description");

  product.setPrice(520.35);
  showRezultTest(product.getPrice() === 520.35, partName+"price");

  product.setBrand("Guchi");
  showRezultTest(product.getBrand() === "Guchi", partName+"brand");

  product.setSizes(["XL", "l"]);
  showRezultTest(JSON.stringify(product.getSizes()) === JSON.stringify(["XL", "L"]), partName+"sizes");

  product.setActiveSize("l");
  showRezultTest(product.getActiveSize() === "L", partName+"active size");

  product.setQuantity(24);
  showRezultTest(product.getQuantity() === 24, partName+"quantity");

  product.setDate(new Date("2023-09-11 10:10:10"));
  showRezultTest(product.getDate() === "11.09.2023, 10:10:10", partName+"date");

  let newReview = new Review("52", "Anna", "2023-09-11 10:10:10", "Any comment", 5, 2, 5, 7);
  product.setReviews([newReview,]);
  showRezultTest(JSON.stringify(product.getReviews()) === JSON.stringify([newReview,]), partName+"reviews");

  product.setImages(["images1"]);
  showRezultTest(JSON.stringify(product.getImages()) === JSON.stringify(["images1"]), partName+"images");
}

/**
 * The function calls the testing of all functions except getters and setters of an 
 * object created usingthe Product constructor.
 * @param {Product} product An object created using the Product constructor 
 */
function testAnotherFunctions(product){
  showRezultTest(JSON.stringify(product.getReviewByID("52")) === JSON.stringify(product.getReviews()[0]), "Get review by ID");
  showRezultTest(product.getImage(0) === "images1", "Get index");

  product.addSize("xs");
  showRezultTest(JSON.stringify(product.getSizes()) === JSON.stringify(["XL", "L", "XS"]), "Add size");

  product.deleteSize("l");
  showRezultTest(JSON.stringify(product.getSizes()) === JSON.stringify(["XL", "XS"]) &&
                product.getActiveSize() === "XL", "Delete size");
  
  newReview = new Review("12", "Tom", "2023-05-03 11:03:24", "Very Good", 1, 2, 3, 4);
  product.addReview("12", "Tom", "2023-05-03 11:03:24", "Very Good", 1, 2, 3, 4);
  product.deleteReview("52");
  showRezultTest(JSON.stringify(product.getReviews()) === JSON.stringify([newReview,]), "Add and delete review");

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

