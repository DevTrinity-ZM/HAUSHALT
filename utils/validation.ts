export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateEmail(email: string): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validatePassword(password: string): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateName(name: string): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!name) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (name.length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateExpenseInput(input: string): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!input || input.trim().length === 0) {
    errors.push({ field: 'description', message: 'Expense description is required' });
  } else {
    // Check if amount is present
    const amountRegex = /(?:K|ZMW)?\s*(\d+(?:\.\d{2})?)/i;
    if (!amountRegex.test(input)) {
      errors.push({ field: 'description', message: 'Please include an amount (e.g., "Shoprite 350")' });
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateGroupName(name: string): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!name) {
    errors.push({ field: 'name', message: 'Group name is required' });
  } else if (name.length < 2) {
    errors.push({ field: 'name', message: 'Group name must be at least 2 characters' });
  } else if (name.length > 50) {
    errors.push({ field: 'name', message: 'Group name must be less than 50 characters' });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
