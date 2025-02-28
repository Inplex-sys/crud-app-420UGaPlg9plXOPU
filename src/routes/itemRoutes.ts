import Router, { t } from 'elysia';

import ItemService from '../services/itemService';

import type { CreateItemDTO, UpdateItemDTO } from "../models/Item";
const itemRoutes = new Router();

itemRoutes.post(
	"/items",
	async ({ set, body }) => {
		try {
			const item = await ItemService.createItem(body as CreateItemDTO);

			return item;
		} catch (error: any) {
			set.status = 400;
			return {
				message: "Failed to create item",
				error: error.message,
			};
		}
	},
	{
		body: t.Object({
			name: t.String(),
			description: t.String(),
			price: t.Number(),
			quantity: t.Number(),
			isActive: t.Boolean(),
			tags: t.Array(t.String()),
		}),
		response: t.Union([
			t.Object({
				name: t.String(),
				description: t.String(),
				price: t.Number(),
				quantity: t.Number(),
				isActive: t.Boolean(),
				tags: t.Array(t.String()),
				createdAt: t.Date(),
				updatedAt: t.Date(),
			}),
			t.Object({
				message: t.String(),
				error: t.String(),
			}),
		]),
	}
);

itemRoutes.get(
	"/items",
	async ({ set }) => {
		try {
			const items = await ItemService.getAllItems();

			return items;
		} catch (error: any) {
			set.status = 500;
			return {
				message: "Failed to retrieve items",
				error: error.message,
			};
		}
	},
	{
		response: t.Union([
			t.Array(
				t.Object({
					name: t.String(),
					description: t.String(),
					price: t.Number(),
					quantity: t.Number(),
					isActive: t.Boolean(),
					tags: t.Array(t.String()),
					createdAt: t.Date(),
					updatedAt: t.Date(),
				})
			),
			t.Object({
				message: t.String(),
				error: t.String(),
			}),
		]),
	}
);

itemRoutes.get(
	"/items/:id",
	async ({ params }) => {
		try {
			const { id } = params;
			const item = await ItemService.getItemById(id);

			if (!item) {
				return {
					status: 404,
					body: { message: "Item not found" },
				};
			}

			return item;
		} catch (error: any) {
			return {
				status: 500,
				body: {
					message: "Failed to retrieve item",
					error: error.message,
				},
			};
		}
	},
	{
		response: t.Union([
			t.Object({
				name: t.String(),
				description: t.String(),
				price: t.Number(),
				quantity: t.Number(),
				isActive: t.Boolean(),
				tags: t.Array(t.String()),
				createdAt: t.Date(),
				updatedAt: t.Date(),
			}),
			t.Object({
				message: t.String(),
				error: t.String(),
			}),
		]),
	}
);

itemRoutes.put(
	"/items/:id",
	async ({ set, params, body }) => {
		try {
			const { id } = params;
			const item = await ItemService.updateItem(
				id,
				body as UpdateItemDTO
			);

			if (!item) {
				set.status = 404;
				return { message: "Item not found" };
			}

			return item;
		} catch (error: any) {
			set.status = 500;
			return {
				message: "Failed to update item",
				error: error.message,
			};
		}
	},
	{
		body: t.Object({
			name: t.String(),
			description: t.String(),
			price: t.Number(),
			quantity: t.Number(),
			isActive: t.Boolean(),
			tags: t.Array(t.String()),
		}),
		response: t.Union([
			t.Object({
				name: t.String(),
				description: t.String(),
				price: t.Number(),
				quantity: t.Number(),
				isActive: t.Boolean(),
				tags: t.Array(t.String()),
				createdAt: t.Date(),
				updatedAt: t.Date(),
			}),
			t.Object({
				message: t.String(),
				error: t.String(),
			}),
		]),
	}
);

itemRoutes.delete(
	"/items/:id",
	async ({ set, params }) => {
		try {
			const { id } = params;
			const deleted = await ItemService.deleteItem(id);

			if (!deleted) {
				return { message: "Item not found" };
			}

			return {
				message: "Item deleted",
			};
		} catch (error: any) {
			set.status = 500;
			return {
				message: "Failed to delete item",
				error: error.message,
			};
		}
	},
	{
		response: t.Union([
			t.Object({
				message: t.String(),
			}),
			t.Object({
				message: t.String(),
				error: t.String(),
			}),
		]),
	}
);

export default itemRoutes;
