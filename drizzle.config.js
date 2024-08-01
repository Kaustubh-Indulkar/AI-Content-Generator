/** @type {import("drizzle-kit").Config} */
export default{
    schema:"./utils/schema.tsx",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://account:u7ym0xnVhgBO@ep-black-mouse-a59o58ic.us-east-2.aws.neon.tech/AI-Content-Generator?sslmode=require'
    }
}