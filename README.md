# COS 224 Final Project: Online Store Front End

- Repo: https://github.com/RoamingAlone/sample-store
- Website: https://roamingalone.github.io/sample-store/

## Requirements

### Have Four Pages
* Home Page
    * List products with basic info
    * Uri is "/"
* Product Details Page
    * Show comprehensive information for a specific product
    * Uri looks like: “/product/productId” (i.e. “/product/GALAXY_S25”)
* Cart Page
    * Manage products in shopping cart
    * Uri is “/cart”
* Checkout Page
    * Customer Details form
    * Uri is “/checkout”
Products added to cart can be saved into localStorage, which can be shared among all
pages.

### Other reqs
* Must use React
* All pages share the same header & footer
* Three navigation bar menu items
    * Home page, Cart page and Checkout page.
    * Customer can click each of them no matter what is the current page.
* Styles: Use your own CSS & (Bootstrap or Tailwind).

#### Home Page
* Fetch the two batches of 6 products from
    * https://huitian.serv00.net/project/?type=list&batchNumber=1
    * https://huitian.serv00.net/project/?type=list&batchNumber=2
* Display each batch in a row (i.e. 3 products per row)
* At the bottom of second row, there is a button “Load more products”
    * Click it will load the next batch (i.e. batchNumber = 3, 4…)
    * If “moreProducts” in the JSON response is false. This button should be invisible.
* Display each product with an image, productId, price and a “Add to Cart” button
    * Click the button will add it to a Shopping cart.
    * User can click the same button multiple times.

#### Product Details Page
* Fetch the details of a product from the following url with
the proper productId
    * Example:
    * https://huitian.serv00.net/project/?productId=IPHONE17
* Display 4 thumbnails images vertically on the left hand side of the main image
    * The main image is actually the first thumbnail image
    * Click any thumbnail image will set the main image with it.
* Display price and a “Add to Cart” button at the bottom of the images.
    * Click the button will add it to Shopping cart.
    * Customer can click the same button multiple times.
* Display other information of the products.

#### Shopping Cart Page
* List all products in shopping cart
    * Each row shows information for a product including
        * a thumbnail image, productId, price, quantity and total price
    * Quantity can be adjusted with “-” and “+”, any change will trigger a re-calculation of the total price for this product as well as the total price for all products.
* A “Check out” button at the bottom.
    * Click it will take customer to the checkout page.

#### Checkout Page
* Personal information
    * A few fields to capture Firstname, Lastname, email, phone
    * Each field is required.
* Billing address
    * Create a few fields to capture the Billing address
    * Each field is required.
* Delivery address
    * Create a few fields to capture the Delivery address
    * Each field is required.
    * Add a checkbox “Same as billing address” between billing/delivery address
        * If it is ticked, then auto copy all the address information from the billing section to the delivery section
* Credit card
    * Create a few fields to capture the credit card information
        * Each field is required.
* A terms and conditions checkbox
    * Customer must tick it to enable the “Pay now” button
* A “Pay now” button at the bottom.
    * Click it shows “Congratulations!...”