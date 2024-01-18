module.exports = async (req, res, next) => {
  try {
    if (req.user?.role == 'admin') {
      next();
    } else {
      res.status('You are not admin!');
      setTimeout(() => {
        res.redirect('/');
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
};
