export default function Home() {
  return (
    <main className="max-w-2xl mx-auto mt-8 mb-8 p-8 bg-white rounded shadow-md">
      <h1 data-cy="main-title" className="text-4xl font-bold text-gray-800 mb-6">
        Itembase
      </h1>

      <p className="text-gray-700 mb-8">
        This Next.js 13 application serves as a custom REST API for managing items. It utilizes
        Prisma as the ORM for database interactions and connects to a PostgreSQL database. The
        project is developed using TypeScript and follows linting rules with ESLint.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technology Stack</h2>
        <ul className="text-gray-700 list-disc pl-6">
          <li>Next.js 13: A React framework with server-side rendering and other features.</li>
          <li>Prisma: An Object-Relational Mapping (ORM) tool for database access.</li>
          <li>PostgreSQL: A relational database for storing item-related data.</li>
          <li>TypeScript: A superset of JavaScript that adds static types to the language.</li>
          <li>ESLint: A pluggable linting utility for JavaScript and TypeScript.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cache and Rate Limiting</h2>
        <ul className="text-gray-700 list-disc pl-6">
          <li>Redis: Utilized as a distributed cache to enhance performance and scalability.</li>
          <li>
            Rate Limiter: Implements a basic rate limiter to control the frequency of API requests.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Testing</h2>
        <ul className="text-gray-700 list-disc pl-6">
          <li>Cypress: Used for end-to-end testing of the application.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">API Functionality</h2>
        <ul className="list-disc pl-6">{/* Include API Functionality content here */}</ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use Cases</h2>
        <p className="text-gray-700 mb-2">
          - Efficiently manage items with comprehensive CRUD operations.
        </p>
        <p className="text-gray-700 mb-2">
          - Perform bulk operations for enhanced efficiency when working with multiple items.
        </p>
        <p className="text-gray-700 mb-2">
          - Utilize search functionality to retrieve specific items based on defined criteria.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
        <ol className="text-gray-700 list-decimal pl-6">
          <li>Clone the repository.</li>
          <li>
            Install dependencies using <code className="bg-gray-200 p-1 rounded">npm install</code>.
          </li>
          <li>Configure your PostgreSQL database connection in the Prisma configuration.</li>
          <li>
            Run the application using <code className="bg-gray-200 p-1 rounded">npm run dev</code>.
          </li>
          <li>
            Access the API at <code className="bg-gray-200 p-1 rounded">http://localhost:3000</code>
            .
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Development</h2>
        <p className="text-gray-700 mb-2">- TypeScript is used for type-safe development.</p>
        <p className="text-gray-700 mb-2">
          - ESLint is configured to ensure code quality and adherence to coding standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">License</h2>
        <p className="text-gray-700">
          This project is licensed under the{" "}
          <a data-cy="license-link" href="/license" className="text-blue-500">
            MIT License
          </a>
          .
        </p>
      </section>
    </main>
  );
}
