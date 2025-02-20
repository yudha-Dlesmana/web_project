const { Sequelize, QueryTypes} = require('sequelize');
const config = require('../config/config.json');
const { Projects } = require('../models');
const path = require('path');
const fs = require('fs');


const sequelize = new Sequelize(config.development)

function renderIndex (req, res){
    res.render('index')
}

function renderContact(req, res){
    res.render('contact')
}

async function renderProjects(req, res)
{
    // raw query
    // const projectList = await sequelize.query(`SELECT * FROM public."Projects" ORDER BY id ASC `,
    //     {type: QueryTypes.SELECT}
    // );

    // model
    const projectList = await Projects.findAll()
    res.render('project-list', {projects: projectList});
}

function renderProjectSubmit(req, res)
{
    return res.render('project-submit')
}

async function projectSubmit(req, res)
{
    // console.log(req.body)
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
    const image = req.file.path;
    console.log('file ada di' + image)

    // simpan data di db
    // const submitProject = await Projects.create(
    //     {
    //         projectName,
    //         startAt : startDate,
    //         endAt: endDate,
    //         desc,    
    //         tech
    //     });
    res.redirect('/project')
}

async function renderProjectDetail(req, res)
{
    const id = req.params.id;
    const projectDetail = await Projects.findByPk(id);

    res.render('project-detail', {project: projectDetail});
}

async function renderProjectUpdate (req, res)
{
    const id = req.params.id;
    const projectUpdating = await Projects.findByPk(id);
    
    res.render('project-update', {project: projectUpdating})
}

async function projectUpdate(req, res)
{
    const id = req.params.id;
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

    const old = await Projects.findByPk(id)
    console.log(old);
    await old.update(
        { 
            projectName, 
            startAt: startDate, 
            endAt: endDate, 
            desc, 
            tech, 
            update: sequelize.fn("NOW")
        }
    )
    console.log(old)

    res.redirect('/project')
}

async function deleteProject (req, res)
{
    const id = req.params.id
    await Projects.destroy({
        where: {
            id: id
        }
    })
    res.redirect('/project')
}

module.exports = 
{
    renderIndex, 
    renderContact, 
    renderProjects,
    renderProjectSubmit, 
    projectSubmit, 
    renderProjectDetail, 
    renderProjectUpdate, 
    projectUpdate,
    deleteProject
}
