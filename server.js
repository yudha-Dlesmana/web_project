const express = require ('express');
const hbs = require('hbs');
const path = require ('path');

const app = express()
const port = 3000


app.set('view engine', 'hbs')
app.use(express.static('assets'))

hbs.registerPartials(`${__dirname}/views/partials`, function(err) {});
hbs.registerHelper('equal', (a, b) => {
  return a === b
})

let projects = []

app.get('/', (req, res) => {
  res.render('index')
}); // aman

app.get('/project', (req,res) =>{
  res.render('project-list')
});

app.get('/project-detail', (req, res) =>{
  res.render('project-detail')
})

app.get('/project-submit', (req, res) => {
  res.render('project-submit')
})

app.get('/project-edit', (req, res) => {
  res.render('project-edit')
})

app.get('/contact', (req, res) => {
  res.render('contact')
}) // aman

  
app.listen(port, () => {
  console.log(`Task app listening on port ${port}`)
})
  