# Jobly


App

- BrowserRouter
-- State holder
--- Navbar
    ~Context Holder: All jobs?~

        Companies list      Props: all companies. Data from /companies
            company cards   Props: overview about company passed from above
            company detail  Props: company details. API to /companies/:handle
                job cards   Props: overview of jobm passed from above
        
        Jobs list           Props: API call for Jobs api /jobs
            job cards       Props: detials about one job api jobs/:id

