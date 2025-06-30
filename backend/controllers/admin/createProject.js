const pool = require('../../../backend/config/db');
const fs = require('fs');

exports.createProject = async (req, res) => {
  try {
    const { title, description, technology, github_link, live_demo_link } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title va description to‘ldirilishi shart" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Kamida bitta rasm yuklang" });
    }

    const projectResult = await pool.query(
      `INSERT INTO projects (title, description, technology, github_link, live_demo_link)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, technology, github_link, live_demo_link]
    );

    const projectId = projectResult.rows[0].id;

    const imageInsertPromises = req.files.map(file =>
      pool.query(
        `INSERT INTO project_images (project_id, image_url)
         VALUES ($1, $2)`,
        [projectId, file.path]
      )
    );

    await Promise.all(imageInsertPromises);

    res.status(201).json({
      message: "Project muvaffaqiyatli yaratildi",
      project: projectResult.rows[0],
    });
  } catch (err) {
    console.error("Project yaratishda xatolik:", err);
    res.status(500).json({ message: "Server xatosi" });
  }
};
