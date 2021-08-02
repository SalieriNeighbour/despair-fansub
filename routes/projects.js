const express = require('express');
const router = express.Router();

const Project = require('../models/Project');

const auth = require('../middleware/auth');

// Get projects
// Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().collation({locale: 'en', strength: 1}).sort({title: 1});
        res.send(projects);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});

// Get specific project
// Public
router.get('/:project_id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.project_id);
        if (!project) {
            return res.status(404).send("Not Found");
        }
        res.send(project);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});

// Post project
// Private
router.post('/', auth, async (req, res) => {
    try {
        const {title, synopsis, classification, num_eps, year, cover, qualidade, video, source, audio, tradutor, typesetter, encoder, quality_checker, karaoke, revisor, timer, logo_creator, eps, status} = req.body;

        if (title === '' || synopsis === '' || classification === '' || tradutor === '' || typesetter === '' || eps === {} || encoder === '' || year === '' || cover === '' || qualidade === '' || video === '' || audio === '' || cover.match(/\.(jpeg|jpg|png)$/) == null || (status !== 'em-andamento' && status !== 'concluidos')){
            return res.status(400).send("Post inválido.");
        }
        
        project = new Project({
            title,
            synopsis,
            classification,
            num_eps,
            year,
            cover,
            qualidade,
            video,
            source,
            audio,
            tradutor,
            typesetter,
            encoder,
            quality_checker,
            karaoke,
            revisor,
            timer,
            logo_creator,
            eps,
            status
        });

        await project.save();

        res.json("Post realizado com sucesso.")
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});

// Edit project
// Private
router.put('/:project_id', auth, async (req, res) => {
    try {
        const {title, synopsis, classification, num_eps, year, cover, qualidade, video, source, audio, tradutor, typesetter, encoder, quality_checker, karaoke, revisor, timer, logo_creator, eps, status} = req.body;

        if (title === '' || synopsis === '' || classification === '' || tradutor === '' || typesetter === '' || eps === {} || encoder === '' || year === '' || cover === '' || qualidade === '' || video === '' || audio === '' || cover.match(/\.(jpeg|jpg|png)$/) == null || (status !== 'em-andamento' && status !== 'concluidos')){
            return res.status(400).send("Post inválido.");
        }

        let project = await Project.findById(req.params.project_id);
        
        project.title = title;
        project.synopsis = synopsis;
        project.classification = classification;
        project.num_eps = num_eps;
        project.year = year;
        project.cover = cover;
        project.qualidade = qualidade;
        project.video = video;
        project.source = source;
        project.audio = audio;
        project.tradutor = tradutor;
        project.typesetter = typesetter;
        project.encoder = encoder;
        project.quality_checker = quality_checker;
        project.karaoke = karaoke;
        project.revisor = revisor;
        project.timer = timer;
        project.logo_creator = logo_creator;
        project.eps = eps;
        project.status = status;


        await project.save();

        res.json("Edição realizada com sucesso.")
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});

// Delete project
// Private
router.delete('/:project_id', auth, async (req, res) => {
    try {
        await Project.findOneAndDelete({_id: req.params.project_id});

        res.json("Post deletado com sucesso.");
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Not Found');
    }
});

module.exports = router;