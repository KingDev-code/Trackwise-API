User and Project Management API
Overview
This RESTful API, developed using NodeJS, orchestrates user authentication and project tracking. Leveraging Docker for seamless deployment and MySQL for robust data storage, this API integrates essential components for user and project management.

Technologies
NodeJS - Server-side logic
Docker - Deployment containerization
MySQL - Data management
PHP - Utilized in specific backend components
Key Features
User Management: Secure user profile creation and token-based authentication.
Project Management: Efficient handling of project lifecycle, from creation to updates.
Article Management: Detailed article operations within projects with full validation.
Getting Started
Prerequisites
Ensure you have Docker, Node.js, and MySQL installed on your system to run this application.

Installation Steps
Clone the Repository
bash
Copy code
git clone [repository URL]
Project Setup
Navigate to the project directory:
bash
Copy code
cd [project-directory]
Start the project using Docker:
bash
Copy code
docker-compose up --build
Configuration
Setup the necessary environment variables within a .env file as guided by the .env.example in the repository.

Running the Application
Launch the application with:

bash
Copy code
docker-compose up
API Endpoints
User Management:
Create/Update User: POST /users
Authenticate User: POST /users/auth
Project Management:
Create/Update Project: POST /projects
Article Management:
Manage Articles: POST /projects/{projectId}/articles
Documentation
Each endpoint is detailed with:

URL
Method
Parameters
Response Structure: JSON
Security: Authentication specifics
Examples: Sample requests and responses
How to Contribute
We welcome contributions. Fork the repository, make your changes, and submit a pull request.

Contact Information
For support or collaborations, reach out via email: davidavirodrigues27@gmail.com.

Acknowledgements
Thank you to all contributors for their insights and continued support that drive the evolution of this project.
