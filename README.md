# Blog API

## Features

- Create blog posts
- Retrieve all blog posts
- Retrieve a specific blog post by ID
- Update existing blog posts
- Delete blog posts

## Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/yourusername/blog-api.git](https://github.com/CharanAdithya6505/Ideapulse-server.git)
   cd blog-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and set up your environment variables (see [Environment Variables](#environment-variables)).

## Usage

To start the server, run:

```bash
npm start
```

The server will run on port 3002 (or any port specified in your `.env` file).

## API Endpoints

| Method | Endpoint          | Description                       |
|--------|-------------------|-----------------------------------|
| POST   | `/blogs`          | Create a new blog post           |
| GET    | `/blogs`          | Retrieve all blog posts          |
| GET    | `/blog/:id`       | Retrieve a specific blog post    |
| PUT    | `/blog/:id`       | Update an existing blog post     |
| DELETE | `/blog/:id`       | Delete a blog post               |

## Environment Variables

You need to create a `.env` file in the root directory with the following variables:

```
PORT=3002
MONGODB_URI=your_mongodb_connection_string
```

## Blog Data Model

The `Blogs` model represents a blog post in the application and is structured as follows:

| Field         | Type       | Description                               |
|---------------|------------|-------------------------------------------|
| id            | Int        | Unique identifier for each blog (Auto Increment) |
| title         | String     | Title of the blog post                    |
| content       | String     | Main content of the blog                  |
| author        | String     | Name of the author                        |
| image         | String?    | URL to the blog post image (optional)     |
| category      | String     | Category of the blog post                 |
| authorPic     | String?    | URL to the author's picture (optional)    |
| publishedDate | DateTime   | Date when the blog post was published (defaults to the current date) |
| matter        | String?    | Additional matter or summary (optional)   |
| tags          | Tags[]     | Array of tags for the blog post           |

## Contributing

Contributions are welcome! Please feel free to submit a pull request or create an issue.
