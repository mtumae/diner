import { mutation, query } from "./_generated/server";
import { faker } from "@faker-js/faker";


export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});



function createRandomItem(){
    return {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: Number.parseFloat(faker.commerce.price()),
            orders: faker.number.int({ min: 0, max: 1000 }),
            quantity:faker.number.int({ min: 0, max: 10 }),
            imageUrl: faker.image.url({ width: 640, height: 480})
        };
}

export const getRandomItems = query({
    handler: async (ctx) => {
        faker.seed()
        const data = Array.from({length:20}, () => null).map(() => createRandomItem())
        console.log(data.length, " items generated")
        return data
    }
})



export const getAllItems = query({
    handler: async (ctx) => {
        const data =  await ctx.db
        .query('items')
        .take(20)

       return Promise.all(
        data.map(async (d) => ({
            ...d,
            url: await ctx.storage.getUrl(d.imageUrl) 
            }))
        );
    }
})