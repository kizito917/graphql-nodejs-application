export const registerUser = async (formData) => {
    try {
        let requestBody = {
            query: `
                mutation {
                    createUser(userInput: {name: "${formData.name}", email: "${formData.email}", password: "${formData.password}"}) {
                        _id
                        name
                        email
                    }
                }
            `
        };
        const response = await fetch('http://localhost:9000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await response.json();
        return {
            status: 200,
            data: null,
            message: 'Registration successful',
        }
    } catch (err) {
        return {
            status: 400,
            data: null,
            message: 'Unable to process registration',
        }
    }
}

export const signInUser = async (formData) => {
    try {
        let requestBody = {
            query: `
                mutation {
                    signInUser(email: "${formData.email}", password: "${formData.password}") {
                        message
                        token
                    }
                }
            `
        };
        const response = await fetch('http://localhost:9000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        return {
            status: 200,
            data: result.data.signInUser.token,
            message: result.data.signInUser.message,
        }
    } catch (err) {
        return {
            status: 400,
            data: null,
            message: 'Unable to process login',
        }
    }
}