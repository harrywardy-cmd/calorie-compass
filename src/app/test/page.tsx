import { prisma } from "@/lib/prisma";

export default async function TestPage() {
  const users = await prisma.user.findMany();

  return (
    <div className="p-8">
      <h1>Database Test</h1>

      <pre>
        {JSON.stringify(users, null, 2)}
      </pre>
    </div>
  );
}