const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: 'Acceso denegado. No autenticado.' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Acceso denegado. No tienes permisos de administrador.'
      });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error en la verificación de permisos.' });
  }
};

module.exports = { isAdmin };
