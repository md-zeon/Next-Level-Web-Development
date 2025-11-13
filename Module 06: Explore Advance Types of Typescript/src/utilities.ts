// Utility Types

type Product = {
	id: number;
	name: string;
	price: number;
	description?: string;
	stock: number;
	color?: string;
};

// type ProductSummery = {
// 	id: number;
// 	name: string;
// 	price: number;
// };

type ProductSummery = Pick<Product, "id" | "name" | "price">;

type ProductWithoutStockAndColor = Omit<Product, "stock" | "color">;

type ProductWithRequiredColorAndDescription = Required<Product>;

type ReadonlyProduct = Readonly<Product>;

type PartialProductAllOptional = Partial<Product>;

type ProductNameAndPrice = Record<"name" | "price", string | number>;

const emptyObject: Record<string, unknown> = {};
