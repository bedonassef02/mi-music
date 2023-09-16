# Mi-Music

![Mi-Music](https://cdn6.aptoide.com/imgs/9/2/e/92e94d1615fdf418a87befcd762cfac1_fgraphic.jpg)

## Introduction

Mi-Music is an innovative music streaming application built using Nest.js and MongoDB, designed to provide users with an exceptional music listening experience. With a focus on performance, security, and user-friendly features, Mi-Music takes music streaming to the next level.

Our Nest.js backend ensures robust and scalable performance, while MongoDB serves as a reliable and flexible database to store your extensive music catalog. Here's what sets Mi-Music apart:

- **Seamless Music Playback:** Mi-Music offers uninterrupted music playback, thanks to its optimized backend architecture. Whether you're on a mobile device or desktop, enjoy your favorite tunes without interruptions.

- **Personalized Playlists:** Tailor your music experience with personalized playlists that adapt to your music taste. Mi-Music's intelligent algorithms curate playlists based on your listening history, making every session unique.

- **Search and Discover:** Explore a vast library of songs and artists effortlessly. Our search functionality and recommendation engine make it easy to discover new music or find old favorites.

- **Secure User Accounts:** Your music preferences and playlists are securely stored with user authentication and access control. Rest assured that your data is protected.

- **Continuous Updates:** We are committed to enhancing your music experience. Mi-Music receives regular updates to introduce new features and improve performance.

## Getting Started

To get started with Mi-Music, follow these steps:

1. Clone the repository: `git clone https://github.com/BedoNassef71/mi-music.git`
2. Install dependencies: `npm install`
3. Configure your MongoDB connection in `.env`.
4. Start the application: `npm run start`

## 💻 Technologies

Mi-Music leverages cutting-edge technologies to deliver a seamless and secure music streaming experience:

- **Nest.js:** A robust, scalable backend framework ensures optimal performance.

- **MongoDB:** A flexible and reliable database solution for storing and managing extensive music catalogs.

- **Mongoose:** An elegant MongoDB object modeling tool simplifies database interactions.

- **jsonwebtoken:** Provides secure authentication and authorization.

- **joi:** A validation library to ensure data integrity.

- **bcrypt.js:** Adds an extra layer of security through password hashing.

- **config and dotenv:** Streamline configuration management.

- **nodemailer:** Facilitates email notifications and communications.

- **multer:** Enables efficient file uploads.

- **passport-js:** Simplifies authentication processes.
Certainly, here's an improved version of your Postman Documentation section:

## 📚 Postman Documentation

For detailed documentation of Mi-Music's API endpoints and how to interact with them, please refer to our comprehensive Postman collection:

[![Postman Documentation](https://img.shields.io/badge/Postman-Documentation-orange)](https://documenter.getpostman.com/view/23775737/2s9YC7SWdF)

This Postman collection provides you with a user-friendly interface to explore and test Mi-Music's API functionalities, making it easier for you to integrate and utilize the services we offer.

Feel free to dive into the documentation to understand how to use Mi-Music's API effectively.

[Explore Postman Documentation](https://documenter.getpostman.com/view/23775737/2s9YC7SWdF)

This improved section adds a visual badge for the Postman Documentation link and provides a clear call-to-action to explore the documentation, making it more engaging and accessible for users.
## 🧐 Key Features

Mi-Music boasts a rich set of features designed to enhance the music streaming experience, catering to both users and administrators:

### User Authentication

- **Secure User Registration:** Users can securely register accounts, providing a personalized music experience.

- **Effortless Login:** Seamlessly log in using email credentials or Google authentication for user convenience and security.

### Admin Dashboard

- **Comprehensive Content Management:** Administrators have control over songs, albums, genres, and artists, enabling efficient content management.

### User-Focused Features

- **Playlist Management:** Users enjoy a dynamic playlist experience, with two default playlists (History and Favorites) and the ability to create unlimited custom playlists.

- **Personalized Recommendations:** The platform leverages intelligent algorithms to curate personalized music recommendations based on user listening history.

- **Robust Search and Discovery:** Easily explore an extensive library of songs and artists using our powerful search functionality, ensuring users never miss their favorite tunes.

- **User Account Security:** Mi-Music prioritizes user data security, with robust user authentication and access controls to safeguard personal information and listening preferences.

- **Regular Updates:** We are committed to continuous improvement, regularly introducing new features and enhancements to enrich your music streaming experience.


## Getting Started

Ready to dive into the world of Mi-Music? Here's how to get started:

1. **Clone the Repository:** Begin by cloning the Mi-Music repository: `git clone https://github.com/BedoNassef71/mi-music.git`.

2. **Install Dependencies:** Navigate to the project directory and install project dependencies: `npm install`.

3. **Configure MongoDB:** Set up your MongoDB connection by configuring the `.env` file.

4. **Launch the Application:** Start the Mi-Music application: `npm run start`.
## Configuration

Before you can start using Mi-Music, you'll need to configure some essential settings. Below, you'll find the necessary configuration parameters and where to set them:

### App URL and Port

- `APP_URL`: The URL where your Mi-Music application is hosted.
- `APP_PORT`: The port on which your application runs.

### Database

- `DATABASE_USERNAME`: Your database username.
- `DATABASE_NAME`: The name of your MongoDB database.
- `DATABASE_PASSWORD`: Your database password.
- `DATABASE_URI`: The URI for connecting to your MongoDB database.

### JWT Token

- `JWT_SECRET_KEY`: The secret key used to sign JWT tokens.
- `JWT_EXPIRES_IN`: Token expiration time.

### Email

- `APP_SERVICE_NAME`: The name of your email service provider (e.g., Gmail).
- `APP_EMAIL_ADDRESS`: Your email address for sending notifications.
- `APP_EMAIL_PASSWORD`: Your email account password.

### Cookie

- `COOKIE_TOKEN_MAX_AGE`: The maximum age of cookies in your application.

### Uploads

- `UPLOADS_DIR`: The root directory for file uploads.
- `USER_IMAGE_DIR`: Directory for user profile images.
- `ALBUM_IMAGE_DIR`: Directory for album cover images.
- `SONG_IMAGE_DIR`: Directory for song images.
- `PLAYLIST_IMAGE_DIR`: Directory for playlist cover images.

### OAuth2 (Google Authentication)

- `GOOGLE_CLIENT_ID`: Your Google OAuth2 client ID.
- `GOOGLE_SECRET`: Your Google OAuth2 client secret.
- `GOOGLE_REDIRECT_URL`: The redirect URL for Google OAuth2 authentication.

Make sure to configure these settings appropriately in your project environment, typically using a `.env` file, before running Mi-Music.

## Contact

If you have any inquiries or require assistance, don't hesitate to reach out to us at [bedonassef71@gmail.com](mailto:bedonassef71@gmail.com). We value your feedback and are here to support you in your musical journey with Mi-Music.
