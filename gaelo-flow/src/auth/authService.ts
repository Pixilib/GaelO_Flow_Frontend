import axios from 'axios';

interface SignInCredentials {
  username: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

export const signIn = async (credentials: SignInCredentials): Promise<SignInResponse> => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      console.log({response})
      return response.data.access_token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Gérer les erreurs spécifiques à Axios
        if (error.response) {
          const message = error.response.data.message || error.response.statusText;
          throw new Error(`Error connecting : ${message}`);
        } else {
          throw new Error('The request was sent but no response received');
        }
      } else {
        throw new Error('Network or server error');
      }
    }
  };