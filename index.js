import express from "express";
const app = express();
// to make app understand json
app.use(express.json());

let courseDetails = [
  {
    name: "MERN",
    duration: 90,
    tutorName: "Arun",
  },
  {
    name: "Python",
    duration: 90,
    tutorName: "Dipak",
  },
];

// add Course data through postman body
app.post("/course/add", (req, res) => {
  const newCourse = req.body;
  courseDetails.push(newCourse);

  return res.status(200).send({ message: "Student data added successfully" });
});

// view courses
app.get("/course/viewcourse", (req, res) => {
  return res.status(200).send(courseDetails);
});

//search course details
app.get("/course/search", (req, res) => {
  const searchCourse = req.body.name;
  const myCourse = courseDetails.find((item) => {
    if (item.name === searchCourse) {
      return item;
    }
  });
  if (myCourse) {
    return res.status(200).send({ message: "Course Found", myCourse });
  } else {
    return res.status(404).send("Course Not Found");
  }
});

//delete operation: delete course data by name

app.delete("/course/delete", (req, res) => {
  let searchCourse = req.body.name;
  //console.log(searchCourse);
  let newCourseDetails = courseDetails.filter((item, index, self) => {
    if (item.name !== searchCourse) {
      return item;
    }
  });
  courseDetails = [...newCourseDetails];
  return res.status(200).send({ message: "Course Deleted", newCourseDetails });
});

// server and network port
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
