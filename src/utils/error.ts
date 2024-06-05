export const  getErrorMessage = (error: any): string => {
    if (!error || !error.data || !error.data.message) {
      return 'An unknown error occurred.';
    }
  
    const messages = error.data.message.map((err: any) => {
      const field = err.property;
      const constraints = Object.values(err.constraints).join(', ');
      return `${field}: ${constraints}`;
    });
  
    return messages.join(' | ');
  };