import PrismaDriver from "../drivers/PrismaDriver";

import type { CreateItemDTO, Item, UpdateItemDTO } from "../models/Item";

export class ItemService {
	async createItem(data: CreateItemDTO): Promise<Item> {
		return await PrismaDriver.item.create({
			data,
		});
	}

	async getAllItems(): Promise<Item[]> {
		return await PrismaDriver.item.findMany();
	}

	async getItemById(id: string): Promise<Item | null> {
		return await PrismaDriver.item.findUnique({
			where: { id },
		});
	}

	async updateItem(id: string, data: UpdateItemDTO): Promise<Item | null> {
		// Check if item exists
		const existingItem = await this.getItemById(id);
		if (!existingItem) return null;

		return await PrismaDriver.item.update({
			where: { id },
			data,
		});
	}

	async deleteItem(id: string): Promise<boolean> {
		// Check if item exists
		const existingItem = await this.getItemById(id);
		if (!existingItem) return false;

		await PrismaDriver.item.delete({
			where: { id },
		});
		return true;
	}
}

export default new ItemService();
