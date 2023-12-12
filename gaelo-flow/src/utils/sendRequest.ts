import axios,{ AxiosResponse }from 'axios'


interface ResponseData {
    data: any; // Remplacez 'any' par le type de vos données
  }

/**
 * Envoie une requête au serveur.
 * @param requestData - Données de la requête.
 * @returns Données de la réponse.
 * @throws Erreur de requête.
 * @example
 * const response = await sendRequest({ username: 'John', password: 'Doe'});
 * */
export const sendRequest = (requestData:unknown) => {
    return axios
        .post<ResponseData>('/api/request', requestData)    
        .then(function (response:AxiosResponse<ResponseData>) {
            return response.data
        })
        .catch(function (error) {
            if (error.response) {
                throw error.response
            }
            throw error
        })
}