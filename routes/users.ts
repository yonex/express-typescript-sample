import * as express from "express";
var router = express.Router();

/* GET users listing. */
router.get('/', (req: express.Request, res: express.Response, next: Function) => {
    res.send('respond with a resource');
});

export = router;
