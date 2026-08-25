import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, Currency } from "@/lib/currency";
import { FloralMotif } from "@/components/floral-motif";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as { id?: string }).id;
  const orders = userId
    ? await prisma.order.findMany({
        where: { userId, status: "paid" },
        orderBy: { createdAt: "desc" },
        include: { items: { include: { product: true } } },
      })
    : [];

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-1 flex items-center gap-2.5 font-display text-2xl text-brand-900">
        <FloralMotif className="h-5 w-5 text-accent-400" />
        Your account
      </h1>
      <p className="mb-10 text-brand-600">{session.user.email}</p>

      <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-brand-500">
        Order history
      </h2>
      {orders.length === 0 ? (
        <p className="text-brand-600">No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="rounded-md border border-brand-200 p-4">
              <div className="mb-2 flex justify-between text-sm text-brand-500">
                <span>{order.createdAt.toDateString()}</span>
                <span>{formatPrice(order.totalCents, order.currency as Currency)}</span>
              </div>
              <ul className="text-sm text-brand-800">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity} x {item.product.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
