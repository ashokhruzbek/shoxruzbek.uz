const pool = require("../../../backend/config/db");

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Valid project ID is required" });
    }

    // SELECT: project ma'lumotlari va rasmlar JSON agg
    const selectClause = `
      p.*,
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', pi.id,
              'image_url',
                CASE
                  WHEN pi.image_url IS NOT NULL AND pi.image_url != ''
                  THEN CONCAT('https://shoxruzbek.uz/uploads/', pi.image_url)
                  ELSE NULL
                END
            ) ORDER BY pi.id
          )
          FROM project_images pi
          WHERE pi.project_id = p.id
        ), '[]'::json
      ) AS images
    `;

    const query = `
      SELECT ${selectClause}
      FROM projects p
      WHERE p.id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const project = {
      ...result.rows[0],
      images: Array.isArray(result.rows[0].images) ? result.rows[0].images : [],
    };

    // Increment view count
    await pool.query(
      `UPDATE projects SET views = COALESCE(views, 0) + 1 WHERE id = $1`,
      [id]
    );

    res.json({
      message: "Project fetched successfully",
      project,
    });
  } catch (err) {
    console.error("Project olishda xatolik:", err);
    res.status(500).json({ message: "Server xatosi" });
  }
};
