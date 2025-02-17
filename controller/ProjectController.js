const { Sequelize, QueryTypes } = require('sequelize');
const config = require('../config/config.json');
const {project} = require('../models');


const sequelize = new Sequelize(config.development)

async function renderProject(req, res){
    // raw query
    // const projects = await sequelize.query(`SELECT * FROM public."Projects" ORDER BY id ASC `,
    //     {type: QueryTypes.SELECT}
    // );
    const projects = await project.findAll()

    console.log(projects);
    res.render('project-list', {projects: projects});
}



module.exports= {renderProject}