const express = require ('express');
const hbs = require('hbs');
const methodOverride = require('method-override')
const flash = require('express-flash');
const session = require('express-session')
const path = require ('path');
require("dotenv").config();

const port = process.env.SERVER_PORT || 3000;

const 
{
  renderIndex,
  renderContact,
  renderProjects,
  renderMyProjects,
  renderProjectSubmit,
  projectSubmit,
  renderProjectDetail,
  renderProjectUpdate,
  projectUpdate,
  deleteProject,
  renderTestimonials,
  renderRegister,
  authRegister,
  renderLogin,
  authLogin,
  authLogout,
  renderError
} = require('./controller/ProjectController');
const upload = require('./middlewares/upload-file')
const 
{ 
  logged,
  loggedStatus
} = require('./middlewares/auth');
const {formatDateToWIB, rangeDuration, duration} = require('./utils/time')


const app = express();
app.set( 'view engine', 'hbs' );
app.set(  "/views", path.join(__dirname, "./views"));
app.use( "/assets", express.static(path.join(__dirname, './assets')));
app.use( "/uploads", express.static(path.join(__dirname, './uploads')));
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( methodOverride( "_method" ) );
app.use( 
  session({
    name: 'sid_MPCsx5Vr',
    secret: 'LpONRHMZZ4qU9MtB8bCFpMySec',
    resave: false,
    saveUninitialized: false,
  })
)
app.use( flash() );
app.use( loggedStatus );



hbs.registerPartials(`${__dirname}/views/partials`, function(err) {});

hbs.registerHelper('equal', (a, b) => 
  { 
    return a === b 
  })
hbs.registerHelper('isChecked', (arr, n) => 
  { 
    return arr && arr.includes(n) ? 'checked' : '';
  })
hbs.registerHelper('formatDateToWIB', formatDateToWIB);
hbs.registerHelper('rangeDuration', rangeDuration);
hbs.registerHelper('duration', duration);
// index
app.get( '/', renderIndex ); // aman

// contact
app.get( '/contact', renderContact ); // aman

// register
app.get( '/register', renderRegister ); // aman
app.post( '/register', authRegister ); // 

//  login 
app.get( '/login', renderLogin ); // aman
app.post( '/login', authLogin); // aman

// logout
app.get( '/logout', authLogout); // aman

// projectList
app.get( '/project', renderProjects ); // aman

//harus melalui login 
app.get( '/my-project', logged, renderMyProjects) // aman

// projectSubmit
app.get( '/project-submit', logged, renderProjectSubmit ); //aman
app.post( '/project-submit', logged, upload.single('image'), projectSubmit ); //aman

// projectDetail
app.get( '/project/:id', renderProjectDetail ); // aman

// projectUpdate
app.get('/project-update/:id', logged, renderProjectUpdate); // edit gambar 
app.patch('/project-update/:id', logged, upload.single('image'),  projectUpdate); // edit gambar

// projectDelete
app.delete('/project/:id', logged,  deleteProject); // edit add sweet alert

// testimonies
app.get('/testimonials', renderTestimonials);


app.get("/notFound", renderError);

  
app.listen(port, () => {
  console.log(`Task app listening on port ${port}`);
})
  