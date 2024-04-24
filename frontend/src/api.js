import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /* COMPANIES */
  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies. */
  static async getCompanies() {
    let res = await this.request("companies");
    return res.companies;
  }

  /** Create company. */
  static async createCompany(data) {
    let res = await this.request("companies", data, "post");
    return res.company;
  }

  /** Update company. */
  static async updateCompany(handle, data) {
    let res = await this.request(`companies/${handle}`, data, "patch");
    return res.company;
  }

  /** Delete company. */
  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, "delete");
    return res.company;
  }

  /** Get jobs by company. */

  static async getCompanyJobs(handle) {
    let res = await this.request(`companies/${handle}/jobs`);
    return res.jobs;
  }
    /* JOBS */
  /** Get all jobs. */
  static async getJobs() {
    let res = await this.request("jobs");
    return res.jobs;
  }

  /** Get details on a single job. */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Create a job. */
  static async createJob(data) {
    let res = await this.request("jobs", data, "post");
    return res.job;
  }

  /** Update a job. */
  static async updateJob(id, data) {
    let res = await this.request(`jobs/${id}`, data, "patch");
    return res.job;
  }

  /** Delete a job. */
  static async deleteJob(id) {
    let res = await this.request(`jobs/${id}`, {}, "delete");
    return res.job;
  }

  /* USERS */
  /** Get details on a single user. */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get all users. */
  static async getUsers() {
    let res = await this.request("users");
    return res.users;
  }

  /** Create a user. */
  static async createUser(data) {
    let res = await this.request("users", data, "post");
    return res.user;
  }

  /** Update a user. */
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Delete a user. */
  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, "delete");
    return res.user;
  }

  /** Apply for a job. */
  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  /* AUTH */
  /** Get token for login. */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Get token for signup. */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
