import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Avatar,
    Box,
    Grid,
    Divider,
    Button,
    TextField,
    IconButton,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import CreatePost from './CreatePost';

const MyProfile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
    });
    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({
                firstName: decodedToken.firstName || 'John',
                lastName: decodedToken.lastName || 'Doe',
                email: decodedToken.email || 'johndoe@example.com',
                avatar: decodedToken.picture || `https://ui-avatars.com/api/?name=${decodedToken.firstName}+${decodedToken.lastName}&background=random`,
            });
            setEditedUser({
                firstName: decodedToken.firstName || 'John',
                lastName: decodedToken.lastName || 'Doe',
                email: decodedToken.email || 'johndoe@example.com',
            });
        }
    }, []);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        setUser({ ...user, ...editedUser });
        setEditing(false);
        // Here you would typically send a request to update the user info on the server
    };

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleBack = () => {
        navigate('/post');
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box display="flex" alignItems="center" mb={2}>
                <IconButton onClick={handleBack} sx={{ mr: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1">
                    My Profile
                </Typography>
            </Box>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Avatar
                                src={user.avatar}
                                alt={`${user.firstName} ${user.lastName}`}
                                sx={{ width: 150, height: 150, mb: 2 }}
                            />
                            <Typography variant="h5" gutterBottom>
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {user.email}
                            </Typography>
                            {!editing && (
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={handleEdit}
                                    sx={{ mt: 2 }}
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" gutterBottom>
                            User Information
                        </Typography>
                        <Box component="form">
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={editing ? editedUser.firstName : user.firstName}
                                onChange={handleChange}
                                disabled={!editing}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={editing ? editedUser.lastName : user.lastName}
                                onChange={handleChange}
                                disabled={!editing}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={editing ? editedUser.email : user.email}
                                onChange={handleChange}
                                disabled={!editing}
                                margin="normal"
                            />
                            {editing && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSave}
                                    sx={{ mt: 2 }}
                                >
                                    Save Changes
                                </Button>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Create a New Post
            </Typography>
            <CreatePost onPostCreated={() => {/* Handle post creation */}} />
        </Container>
    );
};

export default MyProfile;