import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	todos: defineTable({
		text: v.string(),
		completed: v.boolean(),
	}),

	items:defineTable({
		name: v.string(),
		description: v.string(),
		price: v.optional(v.number()),
		orders:v.number(),
		imageUrl:v.string(),
	}),


	promotions:defineTable({
		title: v.string(),
		description: v.string(),
		imageUrl:v.string(),
	})



});

