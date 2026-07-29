export const stringUtils = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  truncate: (str: string, length: number): string => {
    return str.length > length ? str.substring(0, length) + '...' : str;
  },

  formatDate: (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  },

  generateId: (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },
};