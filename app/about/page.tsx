export const metadata = {
  title: "About",
  description: "Learn more about Mini Store and our mission",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      
      <header className="mb-6">
        <h1 className="text-3xl font-bold">About Us</h1>
      </header>

      <section className="space-y-4 text-gray-600">
        <p>
          Mini Store is your go-to destination for discovering high-quality
          products across multiple categories. We focus on delivering the best
          experience with curated items, competitive pricing, and smooth shopping.
        </p>

        <p>
          Our mission is to simplify online shopping by offering a clean
          interface, fast browsing, and smart filtering.
        </p>
      </section>

      <footer className="mt-6 text-gray-600">
        <p>
          Built using Next.js, focusing on performance and scalability.
        </p>
      </footer>
    </main>
  );
}