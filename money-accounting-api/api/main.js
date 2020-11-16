const account = require('./account');
const bodyParser = require('body-parser');
const cors = require('cors')
const DEFAULT_PORT = 3001;

exports.main = (app) => {
    const port = process.env['PORT'] || DEFAULT_PORT;

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cors());

    // parse application/json
    app.use(bodyParser.json());

    account.init(app).then(() => {
        app.listen(port, () => {
            console.log('money accounting RESTfull API server started on: ' + port);
        })
    });
}
