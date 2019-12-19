const Student = require("../../models/student");
const router = require("express").Router();

router.post("/new", (req, res) => {
    const { firstName, lastName, birthday } = req.body;
    Student.findOne({ firstName: firstName, lastName: lastName })
        .then(student => {
            if (!student) {
                Student.create({
                    firstName: firstName,
                    lastName: lastName,
                    grade: null,
                    birthday: birthday,
                    completion: 0
                }).then(data => {
                    res.status(200).json({ data, msg: { msg: "Student added to database." } })
                })
            } else {
                res.status(400).json({ msg: "Student already exists." })
            }
        })
});

router.get("/all", (req, res) => {
    Student.find({}).sort({ lastName: 1 })
        .then(data => {
            res.status(200).json({ students: data });
        })
})

router.put("/delete/:id", (req, res) => {
    Student.findOneAndDelete({ _id: req.params.id })
        .then(res.status(200).json({ msg: "Student removed from database." }))
        .catch(err => {
            res.status(400).json(err);
        })
})

router.put("/update/:id", (req, res) => {
    console.log('firing')
    console.log(req.body)
    Student.findOneAndUpdate({ _id: req.params.id })
        .then(data => {
            res.status(200).json({ msg: "Student info updated." })
        })
        .catch(() => {
            res.status(400).json({ msg: "Student info update failed." });
        })
})

module.exports = router;