const pool = require("../../../backend/config/db");

exports.getAllProjects = async (req, res) => {
  try {
    // pagination params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

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

    const baseQuery = `FROM projects p ORDER BY p.id DESC`;
    const countQuery = `SELECT COUNT(*) AS total FROM projects`;

    const totalResult = await pool.query(countQuery);
    const totalCount = parseInt(totalResult.rows[0].total);
    const totalPages = Math.ceil(totalCount / limit);

    const dataQuery = `
      SELECT ${selectClause}
      ${baseQuery}
      LIMIT $1 OFFSET $2
    `;

    const result = await pool.query(dataQuery, [limit, offset]);

    const projects = result.rows.map((project) => ({
      ...project,
      images: Array.isArray(project.images) ? project.images : [],
    }));

    res.status(200).json({
      message: "Projects list",
      projects: projects,
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
    });

  } catch (error) {
    console.error("❌ Projects olishda xatolik:", error);
    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};
