import bodyParser from 'body-parser';

export default (app) => {
    console.log("Binding 'body-parser' to app.");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
};
