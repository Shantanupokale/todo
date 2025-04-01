export async function register(previousState , formData){
    try {
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');  
        
        const res = await fetch("https://todo-rust-seven-55.vercel.app/register", {
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