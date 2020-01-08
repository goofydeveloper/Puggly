// ALL YOUR API CALLS!!
// use axios to make those calls
// x-auth-token header has to be attached to axios calls
async function  signup() {
    const params = {
        email: document.getElementById("email").value,
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        birthday: document.getElementById("birthday").value,
        password: document.getElementById("pwd").value
       
    }

    console.log(params);
    
    try {
        //get token
        const res = await axios({
            method:"post",
            url: "/signup", 
            data: params,
            header: {
                'Content-Type' : 'application/json' //only for passing data!
            }
        })
       console.log(res.data);
        
       // if this works, test this
        const header = {
            "x-auth-token": res.data // should be token, maybe printing
        }

        return await axios({
            method: "get",
            header: header, // don't know if this works!!
            url: "/profile"
        })

    } catch (err) {
        console.error(err);
        
    }


function useAx() {
    var tok = { //verify this, idk
        "x-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxNTNmYWQ3NzY1YzA3MjgyMzE0YjQxIn0sImlhdCI6MTU3ODQ1MDg2MSwiZXhwIjoxNTgyMDUwODYxfQ.u8xTBA2TluOc4XjqN9Qot21vlziWc5A6GgOGkchGp5Y"
    }
   return axios.get("/profile", tok)
}}