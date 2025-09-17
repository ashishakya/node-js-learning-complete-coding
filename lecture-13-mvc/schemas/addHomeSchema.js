const {z}  = require("zod")

const addHomeSchema = z.object({
    name:z.string().min(10, "Name must be at least 10 characters long."),
    rent: z.int("Rent must be an integer")
})

module.exports = {addHomeSchema}