interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}

type CreatePayload = Omit<Product, "id" | "createdAt" | "updatedAt">;

type UpdatePayload = Partial<Omit<Product, "id">> & Pick<Product, "id">;

type ClientPreview = Readonly<Pick<Product, "id" | "title" | "price">>;

// ------------- TEST --------------

// These should compile without errors:
const create: CreatePayload = {
  title: "Widget",
  description: "A fine widget",
  price: 9.99,
  discount: 0,
};
const update: UpdatePayload = { id: "abc-123", price: 12.99 }; // only updating price — rest is optional
const preview: ClientPreview = { id: "abc-123", title: "Widget", price: 9.99 };

// These should be TypeScript errors:
const badCreate: CreatePayload = {
  id: "auto",
  title: "Widget",
  description: "...",
  price: 1,
  discount: 0,
};
//   → id is forbidden in CreatePayload

const badUpdate: UpdatePayload = { title: "Widget" };
//   → id is required in UpdatePayload

preview.price = 5;
//   → ClientPreview is read-only
