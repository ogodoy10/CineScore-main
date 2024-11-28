const baseURL = 'http://localhost:8080';

export const fetchAPI = async (endpoint, options = {}, timeout = 5000) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${baseURL}${endpoint}`, {
      ...mergedOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Erro na requisição para ${endpoint}`, {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } 
  
  catch (error) {
    console.error('Erro ao fazer a requisição:', { endpoint, error });
    throw error;
  }
};
