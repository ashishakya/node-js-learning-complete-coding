export function validateSchema(schema){
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        console.log(">>>", result)
        if (!result.success) {
            return res.status(422).json({ errors: result.error.issues }); //3rd output
            // return res.status(422).json({ errors: result.error.format() }); //2nd output
            // return res.status(422).json({ errors: result.error.format() }); one output

            // return res.status(422).json({
            //     errors: result.error
            // });
        }
        // replace req.body with parsed data (ensures correct types)
        req.body = result.data;
        next();
    };
}

