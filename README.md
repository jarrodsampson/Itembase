# Itembase

This Next.js 13 application serves as a custom REST API for managing items. It utilizes Prisma as the ORM for database interactions and connects to a PostgreSQL database. The project is developed using TypeScript and follows linting rules with ESLint.

## Technology Stack

- Next.js 13: A React framework with server-side rendering and other features.
- Prisma: An Object-Relational Mapping (ORM) tool for database access.
- PostgreSQL: A relational database for storing item-related data.
- TypeScript: A superset of JavaScript that adds static types to the language.
- ESLint: A pluggable linting utility for JavaScript and TypeScript.

## API Functionality

The API provides the following key functionalities for managing items:

- **Read Operation:**

  - Endpoint: `GET /items`
  - Description: Retrieves information about items.

  - **Query Parameters:** - `limit` (optional): Specifies the maximum number of items to retrieve. - `offset` (optional): Specifies the number of items to skip for pagination. - `search` (optional): Performs a search for items based on a provided search term.

- **Create Operation:**

  - Endpoint: `POST /items`
  - Description: Creates a new item.

  - **Request Payload:**

    - Type: Object containing a `name` property and an optional `message` property.

    ```json
    {
      "name": "New Item",
      "message": "Creation of a new item requested."
    }
    ```

- **Bulk Delete Operation:**

  - Endpoint: `DELETE /items`
  - Description: Deletes multiple items in a bulk operation.

  - **Request Payload:**

    - Type: Array of `itemIds` to delete.

    ```json
    {
      "itemIds": [123, 456, 789]
    }
    ```

- **Bulk Update Operation:**

  - Endpoint: `PUT /items`
  - Description: Updates multiple items in a bulk operation.

  - **Request Payload:**

    - Type: Object containing an array of `itemIds` and a message.

    ```json
    {
      "itemIds": [123, 456, 789],
      "message": "Bulk update of items requested."
    }
    ```

- **Read Individual Item:**

  - Endpoint: `GET /items/:id`
  - Description: Retrieves information about a specific item.

- **Update Individual Item:**

  - Endpoint: `PUT /items/:id`
  - Description: Updates information for a specific item.

- **Delete Individual Item:**
  - Endpoint: `DELETE /items/:id`
  - Description: Deletes a specific item.

## Use Cases

- Efficiently manage items with comprehensive CRUD operations.
- Perform bulk operations for enhanced efficiency when working with multiple items.
- Utilize search functionality to retrieve specific items based on defined criteria.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure your PostgreSQL database connection in the Prisma configuration.
4. Run the application using `npm run dev`.
5. Access the API at `http://localhost:3000`.

## Development

- TypeScript is used for type-safe development.
- ESLint is configured to ensure code quality and adherence to coding standards.

## License

This project is licensed under the [MIT License](LICENSE).
