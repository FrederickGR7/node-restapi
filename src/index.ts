import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { config } from './config/env-config';
import { verifyRoles } from './utils/role.handlers';
let pkg = require('../package.json');


// import routes
import userRoute from './routes/user.route';
import productRoute from './routes/products.route';


const app = express();
createConnection(config.typeOrm).then(async() => {
    // Verify Roles
    await verifyRoles();
});

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('pkg', pkg)


// routes
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
});
app.use(userRoute);
app.use(productRoute);

// Running Server
app.listen(config.appPort, () => {
    console.log('Server on port', config.appPort);
});