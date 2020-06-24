const puppeteer = require("puppeteer");
const sessionFactory = require("../factory/session");
const userFactory = require("../factory/user");

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      executablePath: process.env.CHROME_BIN || null,
      args: ["--no-sandbox", "--headless", "--disable-gpu"],
    });

    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function (target, property) {
        return customPage[property] || browser[property] || page[property];
      },
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    const user = await userFactory();
    const { session, sig } = await sessionFactory(user);
    await this.page.setCookie({ name: "session", value: session });
    await this.page.setCookie({ name: "session.sig", value: sig });
    await this.page.goto("http://localhost:3050");
    await this.page.waitFor('a[href="/auth/logout"]');
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }
}

module.exports = CustomPage;
