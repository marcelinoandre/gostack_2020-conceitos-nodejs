const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;
  const newRepository = { id: uuid(), title, url, techs, likes };

  repositories.push(newRepository);

  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const indexRepository = repositories.findIndex(
    (repository) => repository.id === request.params.id
  );

  if (indexRepository < 0)
    return response.status(400).json({ error: "Repository not found" });

  const { title, url, techs } = request.body;

  repositories[indexRepository].title = title;
  repositories[indexRepository].url = url;
  repositories[indexRepository].techs = techs;

  return response.json(repositories[indexRepository]);
});

app.delete("/repositories/:id", (request, response) => {
  const indexRepository = repositories.findIndex(
    (repository) => repository.id === request.params.id
  );

  if (indexRepository < 0)
    return response.status(400).json({ error: "Repository not found" });

  repositories.splice(indexRepository, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const indexRepository = repositories.findIndex(
    (repository) => repository.id === request.params.id
  );

  if (indexRepository < 0)
    return response.status(400).json({ error: "Repository not found" });

  repositories[indexRepository].likes++;
  return response.send(repositories[indexRepository]);
});

module.exports = app;
