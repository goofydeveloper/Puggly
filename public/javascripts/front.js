
// ALL YOUR API CALLS!!
// use axios to make those calls
// x-auth-token header has to be attached to axios calls
async function  signup() {
    const body = {
        email: document.getElementById("email").value,
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        birthday: document.getElementById("birthday").value,
        password: document.getElementById("pwd").value
       
    }
  
    try {

        // SIGN UP USER 
        const res = await axios.post("/signup", body, {headers: {
            'Content-Type': 'application/json'
        }})

        // // SET TOKEN IN LOCAL STORAGE
        console.log("WE OUT HERE: ",res.data);
        // localStorage.setItem("token", res.data.token)        
        /////////////////////////////////////////////////////



        // await axios({
        //     method: "post",
        //     url: "/signup",
        //     data: body 
        // }).then(response => alert(response.data))
        
        console.log("I'M HERE NOW!!!");
        
    } catch (err) {
        console.error(err);
        
    }
    // window.location.replace("http://www.w3schools.com");
    // console.log('hi');
    
    // try {
    //     //get token
    //     const res = await axios({
    //         method:"get",
    //         url: "/signup", 
    //         data: params,
    //         header: {
    //             'Content-Type' : 'application/json' //only for passing data!
    //         }
    //     })
    //    console.log(res.data); //give you the token!!!
        
    //    // tested and it works
    //     const header = {
    //         "x-auth-token": res.data // token print's, this works
    //     }

    //     return await axios({
    //         method: "get",
    //         header: header, // don't know if this works!!
    //         url: "/profile"
    //     })

    // } catch (err) {
    //     console.error(err);
        
    // 
    
    // axios({
    //     method: 'post',
    //     url: '/profile',
    //     data: user????
    //   });


    // axios({
    //     method: 'post',
    //     url: '/profile',
    //     data: user
    //   });



    // axios({
    //     method: 'post',
    //     url: '/all',
    //     data: user
    //   });



// function useAx() {
//     var tok = {
//         "x-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxNTNmYWQ3NzY1YzA3MjgyMzE0YjQxIn0sImlhdCI6MTU3ODQ1MDg2MSwiZXhwIjoxNTgyMDUwODYxfQ.u8xTBA2TluOc4XjqN9Qot21vlziWc5A6GgOGkchGp5Y"
//     }
//    return axios.get("/profile", tok)
// }
    }
