import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userRole, setUserRole] = useState('');

  const validateOTP = (otp) => {
    return otp === '1234';
  };

  const validatePassword = (password) => {
    return password === '1234';
  };

  const validatePhone = (phone) => {
    return phone.length >= 10;
  };

  const registerPhone = (phone) => {
    if (validatePhone(phone)) {
      setPhoneNumber(phone);
      return { success: true };
    }
    return { success: false, error: 'Please enter a valid phone number (minimum 10 digits)' };
  };

  const verifyOTP = (otp) => {
    if (validateOTP(otp)) {
      return { success: true };
    }
    return { success: false, error: 'Invalid OTP. Please enter 1234' };
  };

  const login = (phone, password, role = 'user') => {
    if (validatePhone(phone) && validatePassword(password)) {
      const userData = {
        phone,
        role,
        name: role.charAt(0).toUpperCase() + role.slice(1),
      };
      setUser(userData);
      setUserRole(role);
      setPhoneNumber(phone);
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid credentials. Use any phone number (10+ digits) and password 1234' };
  };

  const logout = () => {
    setUser(null);
    setPhoneNumber('');
    setUserRole('');
  };

  const value = {
    user,
    phoneNumber,
    userRole,
    registerPhone,
    verifyOTP,
    login,
    logout,
    setUserRole,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};