export async function register(previousState , formData){
    try {
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');  
        
        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name ,email, password})
        });

        const data = await res.json();
        return data;
    } catch (error) {
        


    }
}