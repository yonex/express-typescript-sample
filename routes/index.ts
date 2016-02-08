import * as express from "express";
var router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response, next: Function) => {
    res.render('index', {title: 'Express'});
});

export = router;
