class HomeController {
  async index(request, response) {
    await response.json({ message: 'Homepage' });
  }
}

export default new HomeController();
