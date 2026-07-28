import { Badge, Card } from "@/components/ui";
import { productCategories } from "@/data/dashboard";
import { CardMenuButton } from "./CardMenuButton";

export function ProductCategoriesCard() {
  return (
    <Card padding="lg" className="h-full">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-text-primary">Product Categories</h2>
        <CardMenuButton label="Product categories menu" />
      </div>
      <p className="mt-5 text-small text-text-secondary">Total Products</p>
      <p className="text-3xl font-bold text-text-primary">1,000</p>
      <div className="mt-5 flex h-3 overflow-hidden rounded-full" aria-label="Product category distribution">
        {productCategories.map((category) => (
          <span key={category.name} style={{ width: `${category.percent}%`, backgroundColor: category.color }} />
        ))}
      </div>
      <ul className="mt-5 divide-y divide-border-default">
        {productCategories.map((category) => (
          <li key={category.name} className="flex items-center gap-3 py-2.5 text-small">
            <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: category.color }} aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate font-semibold text-text-primary">{category.name}</span>
            <span className="text-text-secondary">{category.count}</span>
            <Badge className="bg-brand-light text-brand-primary">{category.percent}%</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
