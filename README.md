# BlogSphere

BlogSphere is a full-featured blogging platform built with modern web technologies including React, Redux, Tailwind CSS, and Appwrite. It allows users to create, edit, and manage blog posts with rich text editing capabilities. The platform also supports user authentication, post management, and a responsive design optimized for both desktop and mobile devices.

## Technologies Used
- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Appwrite
- **Authentication**: Appwrite Authentication
- **Version Control**: Git, GitHub
- **Responsive Design**: Tailwind CSS

## Features
- **User Registration & Login**: User authentication is powered by Appwrite.
- **Rich Text Editor**: Create, edit, and manage blog posts with a full-featured rich text editor.
- **Post Management**: Add, update, and delete blog posts with ease.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/corps21/BlogSphere.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BlogSphere
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
The app will be running on http://localhost:3000

## API Keys

To interact with the Appwrite services, you'll need to add your Appwrite API keys to the project. Follow these steps:

1. Log in to your Appwrite Console.
2. Create a new project or use an existing one.
3. Generate API keys for your project under the API Keys section.
4. Add your keys to the .env file in the root of the project:
   ```bash
    VITE_APPWRITE_URL=your_appwrite_endpoint
    VITE_APPWRITE_PROJECT_ID=your_project_id
    VITE_APPWRITE_DATABASE_ID=your_database_id
    VITE_APPWRITE_COLLECTION_ID=your_collection_id
    VITE_APPWRITE_USER_COLLECTION_ID=your_user_collection_id
    VITE_APPWRITE_STORAGE_ID=your_storage_id
    VITE_TINY_MCE_KEY=your_tiny_mce_key
   ```
  Make sure to replace your_appwrite_endpoint, your_project_id, and your_api_key with your actual values.
  
 ## Contributing
 Feel free to fork this project, submit pull requests, or open issues if you have suggestions or find bugs!

 ## License
 This project is licensed under the MIT License
















