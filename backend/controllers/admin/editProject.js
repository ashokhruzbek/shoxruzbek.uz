const pool = require('../../../backend/config/db');
const fs = require('fs');
const path = require('path');

exports.editProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, description, technology, github_link, live_demo_link } = req.body;

    // Project mavjudligini tekshir
    const projectResult = await pool.query('SELECT * FROM projects WHERE id = $1', [projectId]);
    if (projectResult.rows.length === 0) {
      return res.status(404).json({ message: 'Project topilmadi' });
    }

    // Asosiy malumotni update qil
    const updatedProject = await pool.query(
      `UPDATE projects SET title = $1, description = $2, technology = $3,
       github_link = $4, live_demo_link = $5 WHERE id = $6 RETURNING *`,
      [title, description, technology, github_link, live_demo_link, projectId]
    );

    // Agar yangi rasmlar kelgan bo‘lsa
    if (req.files && req.files.length > 0) {
      // Eski rasmlarni o‘chir
      const oldImages = await pool.query(
        `SELECT * FROM project_images WHERE project_id = $1`,
        [projectId]
      );

      for (const img of oldImages.rows) {
        if (img.image_url && fs.existsSync(img.image_url)) {
          fs.unlinkSync(img.image_url);
        }
      }

      // Eski rasmlar jadvaldan o‘chiriladi
      await pool.query(`DELETE FROM project_images WHERE project_id = $1`, [projectId]);

      // Yangi rasmlar qo‘shiladi
      const insertPromises = req.files.map(file =>
        pool.query(
          `INSERT INTO project_images (project_id, image_url)
           VALUES ($1, $2)`,
          [projectId, file.path]
        )
      );

      await Promise.all(insertPromises);
    }

    res.status(200).json({
      message: "Project muvaffaqiyatli tahrirlandi",
      project: updatedProject.rows[0],
    });

  } catch (error) {
    console.error("❌ Project update xatoligi:", error);
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};
