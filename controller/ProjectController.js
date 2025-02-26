const { Sequelize, where} = require('sequelize');
const config = require('../config/config.json');
const { Project, User } = require('../models');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');


const sequelize = new Sequelize(config.development)


function renderIndex (req, res)
{
    res.render('index')
} // Render Home page

function renderContact(req, res){
    const user = req.session.user;
    if(!user){
        return res.render('contact')
    }
    const userEmail = user.email
    console.log(userEmail)
    res.render('contact', {email:userEmail})
    
} // Render Contact page

// GET project
async function renderProjects(req, res)
{
    // raw query
    // const projectList = await sequelize.query(`SELECT * FROM public."Project" ORDER BY id ASC `,
    //     {type: QueryTypes.SELECT}
    // );

    // model
    const projectList = await Project.findAll({
        include: {
            model: User,
            as: 'user',
            attributes: {exclude: ['password']}
        },
        order: [
            ['updatedAt', 'DESC'],
            ['createdAt', 'ASC']
        ]
    })
    res.render('project-list', {projects: projectList});
} // Render All project page
async function renderMyProjects(req, res)
{
    const user = req.session.user;
    const myProjects = await Project.findAll({
        where: {
            userId: user.id
        },
        include: {
            model: User,
            as: 'user',
            attributes: {exclude: ['password']}
        },
        order: [
            ['updatedAt', 'DESC'],
            ['createdAt', 'ASC']
        ]
    })
    res.render('my-project-list', {projects: myProjects});
} // Render All user's Project page
async function renderProjectDetail(req, res)
{
    const id = req.params.id;
    const projectDetail = await Project.findByPk(id);

    res.render('project-detail', {project: projectDetail});
} // Render One Specific Project page

// POST Project
function renderProjectSubmit(req, res)
{
    return res.render('project-submit')
} // Render Submit Project page
async function projectSubmit(req, res)
{
    const user = req.session.user
    // console.log(user.id)
    const 
    { 
        projectName, 
        startAt,
        endAt, 
        desc,
        tech
    } = req.body;
    const startDate = startAt ? new Date(startAt) : null;
    const endDate = endAt ? new Date(endAt) : null;
    const img =  "/" + req.file.path;

     // simpan data di db
    await Project.create(
        { 
            projectName,
            startAt : startDate,
            endAt: endDate,
            desc,    
            tech,
            img,
            userId : user.id
        });
    res.redirect('/my-project')
} // POST Project

// PATCH Project
async function renderProjectUpdate (req, res)
{
    const user = req.session.user
    const userId = user.id
    const id = req.params.id;

    const projectUpdating = await Project.findOne({
        where: {id, userId},
    });
    if(!projectUpdating){
        res.redirect('/notFound')
    }
    
    res.render('project-update', {project: projectUpdating})
} // Render Update Project Page and GET the updating data
async function projectUpdate(req, res)
{
    const id = req.params.id;
    const user = req.session.user
    const userId = user.id
    
    const 
    { 
        projectName, 
        startAt,
        endAt, 
        desc,
        tech,
    } = req.body;

    const startDate = startAt ? new Date(startAt) : null;
    const endDate = endAt ? new Date(endAt) : null;
    const old = await Project.findOne({
        where: {id, userId},
    });
    // console.log(old.dataValues);
    await old.update(
        { 
            projectName, 
            startAt: startDate, 
            endAt: endDate, 
            desc, 
            tech,
            img: req.file ? "/" + req.file.path: old.img,
        }
    )
    // console.log(old.dataValues);
    res.redirect('/my-project')
} // PATCH Project

// Delete Project
async function deleteProject (req, res)
{
    const user = req.session.user
    const id = req.params.id
    const deleted = await Project.destroy({
        where: {
            id: id,
            userId: user.id
        }
    })
    if (deleted === 0) {
        return res.status(404).send("Project not found or you don't have permission to delete it.");
    }
    res.redirect('/my-project')
} // DELETE Project

function renderTestimonials(req, res)
{
    res.render('testimonials')
}

// auth-register
function renderRegister (req, res)
{
    res.render('auth-register')
} // render register page
async function authRegister(req, res)
{
    // destructuring assignment -> ambil properti object 
    const{username, email, password, confirmPassword} = req.body

    // email checking
    const userEmail = await User.findOne({
        where : { 
            email: email
        }
    })
    if ( userEmail ){
        req.flash('failed', 'Email address is already registered')
        return res.redirect('/register')
    }

    // confirm password
    if ( password != confirmPassword){
        req.flash('failed', 'Password and confirmation do not match')
        return res.redirect('/register')
    }
    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username,
        email,
        password: hashedPassword
    })

    console.log(`
        usename: ${username}\n
        email: ${email}\n
        password: ${hashedPassword}`
    );
    req.flash('registered', 'Your account has been registered, please log in.')
    res.redirect('/login')
} // register 

// auth-login
function renderLogin(req, res)
{
    res.render('auth-login')
} // render login page
async function authLogin(req, res)
{
    // destructuring assignment -> ambil properti object 
    const {email, password} = req.body;

    // find user 
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    if(!user){
        req.flash('incorrect', 'Email not registered');
        return res.redirect('/login');
    }

    // validate password
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        req.flash('incorrect', 'Incorrect password')
        return res.redirect('/login')
    }

    // delete prop password from user
    let loggedInUser = user.toJSON(); //convert obj sequelize ke obj json
    delete loggedInUser.password; // hapus prop password pada obj

    // simpan logged user di session
    req.session.user = loggedInUser; 
    res.redirect('/');
} // login

async function authLogout(req, res)
{
    console.log(`${req.session}`)
    req.session.user = null;
    req.session.destroy()
    res.redirect('/login')
} // logout

async function renderError(req, res)
{
    const user = req.session.user;
    console.log("usernya adalah :", user);
  
    res.render("page-404", { user: user });
} // not found page

module.exports = 
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
}
