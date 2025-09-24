export const delay = (result = true, ms = 2000) => {
    return new Promise((resolve) => setTimeout(() => resolve(result), ms));
  };