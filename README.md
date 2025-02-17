# E-Commerce Application

This project is a backend e-commerce application built using Node.js, Express.js, and MongoDB. It was developed as a learning project to understand the core concepts of building a scalable and maintainable e-commerce platform. The application includes features like user authentication, product management, order processing, and more.

## Features

- **User Authentication**: Register, login, and manage user profiles with JWT-based authentication.
- **Product Management**: Add, update, delete, and view products with categories and brands.
- **Shopping Cart**: Add products to the cart, apply coupons, and proceed to checkout.
- **Order Management**: Create, view, and update orders with different statuses (e.g., Processing, Delivered).
- **Blog Management**: Create, update, delete, and view blog posts with categories.
- **Coupon Management**: Create, update, delete, and apply coupons for discounts.
- **Image Upload**: Upload product and blog images using Cloudinary.
- **Wishlist**: Add and remove products from the user's wishlist.
- **Admin Panel**: Admin users can manage products, categories, brands, coupons, and orders.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Image Upload**: Cloudinary
- **Middleware**: Multer for file uploads, Sharp for image resizing
- **Other Libraries**: Bcrypt for password hashing, Nodemailer for email notifications, Mongoose for MongoDB object modeling

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MohamedRamadanSaudi/E-Commerce-App.git
   cd E-Commerce-App
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```
   DATABASE=mongodb://localhost:27017/app
   JWT_SECRET=your_jwt_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   SECRET_KEY=your_cloudinary_secret_key
   EMAIL=your_email
   EMAIL_PASSWORD=your_email_password
   ```

4. **Run the application**:

   ```bash
   npm start
   ```

   or for development with nodemon:

   ```bash
   npm run server
   ```

5. **Access the application**:
   The server will be running on `http://localhost:4000`.

## API Endpoints

### Auth Routes

- **POST /api/user/register**: Register a new user.
- **POST /api/user/login**: Login a user.
- **POST /api/user/admin-login**: Login as an admin.
- **POST /api/user/forgot-password-token**: Request a password reset token.
- **PUT /api/user/reset-password/:token**: Reset password using the token.
- **GET /api/user/refresh**: Refresh the access token.
- **GET /api/user/logout**: Logout the user.
- **GET /api/user/wishlist**: Get the user's wishlist.
- **POST /api/user/cart**: Add products to the cart.
- **GET /api/user/cart**: Get the user's cart.
- **DELETE /api/user/empty-cart**: Empty the user's cart.
- **POST /api/user/cart/applycoupon**: Apply a coupon to the cart.
- **POST /api/user/cart/cash-order**: Create a cash order.

### Product Routes

- **POST /api/product**: Create a new product (Admin only).
- **GET /api/product**: Get all products.
- **PUT /api/product/upload/:id**: Upload product images (Admin only).
- **PUT /api/product/wishlist**: Add a product to the wishlist.
- **PUT /api/product/rating**: Rate a product.
- **PUT /api/product/:id**: Update a product (Admin only).
- **GET /api/product/:id**: Get a specific product.
- **DELETE /api/product/:id**: Delete a product (Admin only).

### Blog Routes

- **POST /api/blog**: Create a new blog (Admin only).
- **PUT /api/blog/upload/:id**: Upload blog images (Admin only).
- **PUT /api/blog/likes**: Like a blog.
- **PUT /api/blog/dislikes**: Dislike a blog.
- **PUT /api/blog/:id**: Update a blog (Admin only).
- **GET /api/blog/:id**: Get a specific blog.
- **GET /api/blog**: Get all blogs.
- **DELETE /api/blog/:id**: Delete a blog (Admin only).

### Category Routes

- **POST /api/category**: Create a new product category (Admin only).
- **PUT /api/category/:id**: Update a product category (Admin only).
- **DELETE /api/category/:id**: Delete a product category (Admin only).
- **GET /api/category/:id**: Get a specific product category.
- **GET /api/category**: Get all product categories.

### Blog Category Routes

- **POST /api/blog-category**: Create a new blog category (Admin only).
- **PUT /api/blog-category/:id**: Update a blog category (Admin only).
- **DELETE /api/blog-category/:id**: Delete a blog category (Admin only).
- **GET /api/blog-category/:id**: Get a specific blog category.
- **GET /api/blog-category**: Get all blog categories.

### Brand Routes

- **POST /api/brand**: Create a new brand (Admin only).
- **PUT /api/brand/:id**: Update a brand (Admin only).
- **DELETE /api/brand/:id**: Delete a brand (Admin only).
- **GET /api/brand/:id**: Get a specific brand.
- **GET /api/brand**: Get all brands.

### Coupon Routes

- **POST /api/coupon**: Create a new coupon (Admin only).
- **PUT /api/coupon/:id**: Update a coupon (Admin only).
- **DELETE /api/coupon/:id**: Delete a coupon (Admin only).
- **GET /api/coupon/:id**: Get a specific coupon (Admin only).
- **GET /api/coupon**: Get all coupons (Admin only).

## Acknowledgments

- This project was built as part of a learning journey to understand backend development with Node.js and MongoDB.
- Special thanks to the open-source community for providing valuable resources and libraries.
