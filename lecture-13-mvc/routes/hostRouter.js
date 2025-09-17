const express = require("express");

const hostRouter = express.Router();

const hostController = require("../controllers/hostController")

const {addHomeSchema}  = require("../schemas/addHomeSchema")
const { validateSchema } = require("../middlewares/validationMiddleware")

// function validateSchema(schema){
//     return (req, res, next) => {
//         const result = schema.safeParse(req.body);
//         console.log(">>>", result)
//         if (!result.success) {
//             return res.status(422).json({ errors: result.error.issues }); //3rd output
//             // return res.status(422).json({ errors: result.error.format() }); //2nd output
//             // return res.status(422).json({ errors: result.error.format() }); one output
//
//             // return res.status(422).json({
//             //     errors: result.error
//             // });
//         }
//         // replace req.body with parsed data (ensures correct types)
//         req.body = result.data;
//         next();
//     };
// }

hostRouter.get("/add-home", hostController.getAddHome)
hostRouter.post("/add-home", validateSchema(addHomeSchema), hostController.postAddHome)
hostRouter.get("/host-homes", hostController.getHostHomes)

exports.hostRouter = hostRouter;
