import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// Fetch all projects with caching
app.get("/projects", async (req, res) => {
	try {
		const projects = await prisma.project.findMany();
	//   const projects = await prisma.project.findMany();
  
	//   // Cache the result using Prisma Accelerate
	//   await prisma.$accelerate.cache(projects, {
	// 	swr: 60, // Allow stale data for 60 seconds while fetching fresh
	// 	ttl: 60, // Total cache time of 60 seconds
	// 	tags: ["projects_list"], // Cache tag for invalidation
	//   });
  
	res.json(projects);
	} catch (error) {
	  console.error("Error fetching projects:", error);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  });

app.get("/projects/:id", async (req, res) => {
try {
	const project = await prisma.project.findUnique({
		where: { id: req.params.id },
		include: { processMaps: true },
	});
	if (!project) {
		return res.status(404).json({ error: "Project not found" });
	}
	res.json(project);
} catch (error) {
	console.error("Error fetching project:", error);
	res.status(500).json({ error: "Internal Server Error" });
}
});

app.get("/processmap/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;

		const processMap = await prisma.processMap.findUnique({
		where: { projectId },
		});

		if (!processMap) {
		return res.status(404).json({ error: "Process Map not found" });
		}

		res.json(processMap);
	} catch (error) {
		console.error("Error fetching process map:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Create a new project
app.post("/projects", async (req, res) => {
  const { name, description } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: { name, description },
    });

    // Invalidate cache after creation
    await prisma.$accelerate.invalidate({
      tags: ["projects_list"],
    });

    res.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a project and invalidate cache
app.patch("/projects/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { name, description },
    });

    // Invalidate cache to ensure fresh data is fetched
    await prisma.$accelerate.invalidate({
      tags: ["projects_list"],
    });

    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a project
app.delete("/projects/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.project.delete({
      where: { id },
    });

    // Invalidate cache after deletion
    await prisma.$accelerate.invalidate({
      tags: ["projects_list"],
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});