const express = require ('express');
const hbs = require('hbs');
const methodOverride = require('method-override')
const path = require ('path');

const port = 3000;

const 
{
  renderIndex,
  renderContact,
  renderProjects,
  renderProjectSubmit,
  projectSubmit,
  renderProjectDetail,
  renderProjectUpdate,
  projectUpdate,
  deleteProject,
} = require('./controller/ProjectController');

const app = express();
app.set( 'view engine', 'hbs' );
app.use( express.static('assets'));
app.use( express.json() );
app.use( express.urlencoded({ extended: true }))
app.use( methodOverride( "_method" ));



hbs.registerPartials(`${__dirname}/views/partials`, function(err) {});

hbs.registerHelper('equal', (a, b) => 
  { 
    return a === b 
  })
hbs.registerHelper('isChecked', (arr, n) => 
  { 
    return arr && arr.includes(n) ? 'checked' : '';
  })

// index
app.get('/', renderIndex); // aman
// contact
app.get('/contact', renderContact)// aman

// projectList
app.get('/project', renderProjects); //aman

// projectSubmit
app.get('/project-submit', renderProjectSubmit) //aman
app.post('/project-submit', projectSubmit) //aman

// projectDetail
app.get('/project/:id', renderProjectDetail) //aman

// projectUpdate
app.get('/project-update/:id', renderProjectUpdate) //aman
app.patch('/project-update/:id', projectUpdate)

// projectDelete
app.delete('/project/:id', deleteProject) //aman

  
app.listen(port, () => {
  console.log(`Task app listening on port ${port}`)
})
  