const Curriculum = require("../../models/curriculum");
const Student = require("../../models/student");
const router = require("express").Router();

router.post("/new/:title", (req, res) => {
    const newCurriculum = {
        title: req.params.title
    }
    Curriculum.create(newCurriculum)
        .then(() => {
            Student.updateMany(
                {},
                {
                    $push: {
                        grades: {
                            title: req.params.title,
                            assignments: []
                        }
                    }
                }
            ).then(() => { res.status(200).json({ msg: "Subject added to database." }) })
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})
router.get("/get-all", (req, res) => {
    Curriculum.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})

router.put("/add-assignment/:title", (req, res) => {
    Curriculum.findOneAndUpdate(
        { title: req.params.title },
        {
            $push: {
                assignments: {
                    title: req.body.data,
                    grade: null
                }
            }
        }
    )
        .then(data => {
            Student.updateMany(
                { "grades.title": req.params.title },
                {
                    $push: {
                        "grades.$.assignments": {
                            title: req.body.data,
                            grade: null
                        }
                    }
                },
            ).then(data => { console.log(data) })
            res.status(200).json({ msg: data })
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})
router.put("/delete/:id/:title", (req, res) => {
    console.log(req.params.title)
    console.log(req.params.id)
    Curriculum.deleteOne(
        { _id: req.params.id }
    )
        .then(data => {
            Student.updateMany(
                {},
                {
                    $pull: {
                        grades: { title: req.params.title }
                    }
                }
            ).then(data => { console.log(data) })
            res.status(200).json({ msg: "Subject deleted from database." })
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})


module.exports = router;