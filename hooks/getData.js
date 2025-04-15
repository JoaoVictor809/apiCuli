import api from '../apis';

export const getData = () => {
  const getMeal = async () => {
    try {
      const response = await api.get('/categories.php');
      if (response.data && response.data.categories) {
        return { error: false, categories: response.data.categories };
      } else {
        console.error('Resposta da API inesperada:', response.data);
        return { error: true, message: 'Formato de resposta inesperado da API.' };
      }
    } catch (error) {
      console.error('Erro na chamada API:', error); 
      const message = error.response?.data?.message || error.message || 'Ocorreu um erro ao buscar os dados.';
      return { error: true, message: message };
    }
  };

  return {
    getMeal,
  };
};