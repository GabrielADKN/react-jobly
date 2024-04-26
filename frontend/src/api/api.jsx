import axios from "axios";

// const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:3001";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

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
    
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};
    console.debug("API Call:", endpoint, data, method, headers);

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // My additions follow

  // Needs to accept a query string like "?minEmployees=100&hasEquity=true"
  static async getAllCompanies(querystring) {
    let res = await this.request(`companies/${querystring}`);
    return res.companies;
  }


  // Needs to accept an object with data about a company
  static async createCompany(companyObj) {
    let res = await this.request('companies/',companyObj,'post');
    return res.company;
  }

  // Needs to accept an object with data about a company
  static async updateCompany(handle, companyObj) {
    let res = await this.request(`companies/${handle}`,companyObj,'patch');
    return res.company;
  }

  static async getAllJobs() {
    let res = await this.request(`jobs/`);
    return res.jobs;
  }

  static async registerUser(formData) {
    let res = await this.request(`auth/register`,formData,'post');
    return res.token;
  }
  static async loginUser(formData) {
    let res = await this.request(`auth/token`,formData,'post');
    return res.token;
  }
  // get a specific user profile
  static async getProfile(username) {
    let res = await this.request(`users/${username}`);
    // setAuthorizationToken(res.token)
    return res.user;
  }
  // update a user's profile
  static async updateProfile(username,formData) {
    let res = await this.request(`users/${username}`,formData,'patch');
    return res.user;
  }
  // Apply to a job
  static async applyToJob(username,jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`,{},'post');
    return res;
  }

}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  export default JoblyApi;