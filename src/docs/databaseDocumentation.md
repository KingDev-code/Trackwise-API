# Comprehensive API Documentation for Project Management

## Deployment View of the System

This section illustrates the system's architecture within the network infrastructure, showing how different components are interconnected and how data flows between them. This visualization aids in understanding the operational environment and the interactions between hardware and software components.

[Deployment View of System](https://drive.google.com/file/d/11AgJg67V2MzZfBToPchsw7hJpsqEupHr/view?usp=sharing)

### Deployment Components
- **Web Client**: End-users accessing the application via the internet using devices such as desktops, laptops, and smartphones.
- **Web Server**: Manages user requests, serving static content and directing requests to the application server. Typically implemented using NGINX or Apache as a reverse proxy and SSL/TLS handler.
- **Application Server**: Executes business logic, handles data transactions between the web server and the database server, typically running NodeJS with Express.js.
- **Database Server**: Stores all essential data for the application, including user profiles, project details, and articles, using MySQL.
- **Administration Server**: Used for system administration tasks including monitoring and maintenance of the network and servers.

## Database Documentation for Project Management API

### Tables Overview

#### 1. Articles
Stores information related to articles associated with specific projects.

| Field      | Type         | Description                                   |
|------------|--------------|-----------------------------------------------|
| id         | int(11)      | Unique identifier for the article.            |
| title      | varchar(255) | Title of the article.                         |
| content    | text         | Full text content of the article.             |
| projectId  | int(11)      | Foreign key linked to the `projects` table.   |
| createdAt  | datetime     | Timestamp when the article was created.       |
| updatedAt  | datetime     | Timestamp when the article was last updated.  |

#### 2. Projects
Contains information about projects managed by the API.

| Field      | Type         | Description                                       |
|------------|--------------|---------------------------------------------------|
| id         | int(11)      | Unique identifier for the project.                |
| name       | varchar(255) | Name of the project.                              |
| description| text         | Detailed description of the project.              |
| createdAt  | datetime     | Timestamp when the project was created.           |
| updatedAt  | datetime     | Timestamp when the project was last updated.      |
| userId     | int(11)      | Foreign key linked to the `users` table.           |

#### 3. Users
Holds user account information, roles, and activity statuses.

| Field      | Type         | Description                                      |
|------------|--------------|--------------------------------------------------|
| id         | int(11)      | Unique identifier for the user.                  |
| email      | varchar(255) | Email address of the user.                       |
| password   | varchar(255) | Hashed password for user login.                  |
| roles      | text         | Roles assigned to the user.                      |
| isActive   | tinyint(1)   | Status of the user's account, where 1 is active. |
| lastLogin  | datetime     | Timestamp of the user's last login.              |
| createdAt  | datetime     | Timestamp when the user account was created.     |
| updatedAt  | datetime     | Timestamp when the user account was last updated.|

### Relationships and Indexes

- **Relationships**:
  - Articles to Projects: Each article is associated with a single project, managed via `projectId`.
  - Projects to Users: Each project can have one owner, referenced by `userId` linking back to the users table.

- **Indexes**:
  - Articles Table: Indexed on `projectId` for improved performance on joins.
  - Projects Table: Indexed on `userId` for quick lookup of projects by user.

### Security Measures and Performance

- **Security Measures**:
  - Passwords: User passwords are stored as hashed values (using bcrypt) to protect against data breaches.
  - Data Access: Role-based access control (RBAC) is implemented to ensure users can only access data relevant to their roles.

- **Performance and Scalability**:
  - Query Optimization: Frequently used queries are optimized with appropriate indexing.
  - Scalability Considerations: The database schema is designed to efficiently handle increasing amounts of data and concurrent access.

### Version and Changes

- **Schema Version**: 1.0.0
- **Recent Changes**:
  - Added `updatedAt` columns to all tables to track the last update time.
  - Introduced role-based access control for enhanced security.