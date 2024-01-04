import express from "express";

const app = express();

// to make app understand json
app.use(express.json());

// mock db
let movieList = [
  {
    id: 101,
    name: "12th fail",
  },
  {
    id: 102,
    name: "Panchayat",
  },
];

// add movie
app.post("/movie/add", (req, res) => {
  const newMovie = req.body;

  movieList.push(newMovie);

  return res.status(201).send({ message: "Movie is added successfully." });
});

// get movie list
app.get("/movie/list", (req, res) => {
  return res.status(200).send(movieList);
});

// delete a movie
app.delete("/movie/delete/:id", (req, res) => {
  // extract movie id to be deleted from req.params
  const movieIdToBeDeleted = +req.params.id;

  //   remove movie with that id
  const newMovieList = movieList.filter((item, index, self) => {
    if (item.id !== movieIdToBeDeleted) {
      return item;
    }
  });

  movieList = structuredClone(newMovieList);

  return res.status(200).send({ message: "Movie is deleted successfully." });
});

// edit a movie
app.put("/movie/edit/:id", (req, res) => {
  // extract movie id to be edited from req.params
  const movieIdToBeEdited = Number(req.params.id);

  //   extract new values from req.body
  const newValues = req.body;

  //   check if movie with provided id exists
  const requiredMovie = movieList.find((item, index, self) => {
    if (item.id === movieIdToBeEdited) {
      return item;
    }
  });

  // if not movie, throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exist." });
  }

  //   edit that movie
  const newMovieList = movieList.map((item, index, self) => {
    if (item.id === movieIdToBeEdited) {
      return { ...item, ...newValues };
    } else {
      return item;
    }
  });

  movieList = structuredClone(newMovieList);

  return res.status(200).send({ message: "Movie is updated successfully." });
});

// port
const PORT = 6000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
