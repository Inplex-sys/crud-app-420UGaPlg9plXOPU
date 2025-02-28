export interface Item {
	id: string;
	name: string;
	description: string;
	price: number;
}

export interface CreateItemDto {
	name: string;
	description: string;
	price: number;
}

export interface UpdateItemDto {
	name?: string;
	description?: string;
	price?: number;
}
