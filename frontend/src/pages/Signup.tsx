import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  FormHelperText,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface PasswordRequirement {
  label: string;
  met: boolean;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const getPasswordRequirements = (password: string): PasswordRequirement[] => {
    return [
      {
        label: 'At least 10 characters long',
        met: password.length >= 10
      },
      {
        label: 'Contains uppercase letter',
        met: /[A-Z]/.test(password)
      },
      {
        label: 'Contains lowercase letter',
        met: /[a-z]/.test(password)
      },
      {
        label: 'Contains number',
        met: /[0-9]/.test(password)
      },
      {
        label: 'Contains special character',
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      }
    ];
  };

  const validatePassword = (password: string): boolean => {
    const requirements = getPasswordRequirements(password);
    return requirements.every(req => req.met);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password does not meet complexity requirements';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Show password requirements when password field is focused
    if (name === 'password') {
      setShowPasswordRequirements(true);
    }

    // Real-time password match validation
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
      } else if (name === 'confirmPassword' && value !== formData.password) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirmPassword: undefined
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement signup logic
      console.log('Signup attempt:', formData);
    }
  };

  const passwordRequirements = getPasswordRequirements(formData.password);

  return (
    <Box 
      sx={{ 
        width: '100%',
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%',
          maxWidth: '600px',
          p: { xs: 2, sm: 4 }
        }}
      >
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            size="medium"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            size="medium"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            size="medium"
            onFocus={() => setShowPasswordRequirements(true)}
          />
          {showPasswordRequirements && (
            <List dense sx={{ mt: 1, bgcolor: 'background.paper' }}>
              {passwordRequirements.map((req, index) => (
                <ListItem key={index}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {req.met ? (
                      <CheckCircleOutlineIcon color="success" />
                    ) : (
                      <CancelOutlinedIcon color="error" />
                    )}
                  </ListItemIcon>
                  <ListItemText 
                    primary={req.label}
                    sx={{ 
                      '& .MuiListItemText-primary': { 
                        color: req.met ? 'success.main' : 'error.main',
                        fontSize: '0.875rem'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            size="medium"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign Up
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" variant="body1">
              {"Already have an account? Sign In"}
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup; 