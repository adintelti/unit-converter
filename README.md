# Unit-Converter web app

Project Task URL: [https://roadmap.sh/projects/unit-converter](https://roadmap.sh/projects/personal-blog)

this web app was created because of the Unit Converter challenge from roadmap.sh.

Personal Blog is a simple .NET 8 Mvc web app blogging platform where user can create, edit, delete and read one or more articles, using a json file storage and basic authentication middleware to handle security.

## Features

- **Article Management**: Create, read, delete and update article content in stored the file system.
- **File-Based**: Each article is a single json file name after a random id.
- **Basic Authentication**: Secure restrict area with username and password.
- **Html and CSS**: Rendered pages using HTML and CSS for a cleaner design.

## Installation

To run this application, follow these steps:

1. Clone this repository:
    ```bash
    git clone https://github.com/adintelti/personal-blog.git
    ```
2. Navigate to the project directory.
   ```bash
    cd personal-blog/PersonalBlogMvc
    ```
3. Restore dependencies:
   ```bash
    dotnet restore
    ```
4. Start the application:
   ```bash
    dotnet run
    ```
5. Access the application at http://localhost:5142
   
## Usage

Once the web app is running you can check the lattest articles or access the dashboard area to manage content by adding a "/dashboard" to default address.

Username: admin
Password: password
