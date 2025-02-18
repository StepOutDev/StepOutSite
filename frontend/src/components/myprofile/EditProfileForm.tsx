// src/components/myprofile/EditProfileForm.tsx

import React from 'react';
import { TextField, Button, DialogActions } from '@mui/material';

interface UserProfile {
  knickname: string;
  firstlastname: string;
  Year: string;
  Role: string;
  Tel: string;
  StudentId: string;
  Major: string;
  IG: string;
  LineID: string;
  profilePic: string;
}

interface EditProfileFormProps {
  userProfile: UserProfile;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ userProfile, onInputChange, onSave, onCancel }) => {
  return (
    <div>
      <TextField
        label="Full Name"
        name="firstlastname"
        value={userProfile.firstlastname}
        onChange={onInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Year"
        name="Year"
        value={userProfile.Year}
        onChange={onInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Role"
        name="Role"
        value={userProfile.Role}
        onChange={onInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Tel"
        name="Tel"
        value={userProfile.Tel}
        onChange={onInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Student ID"
        name="StudentId"
        value={userProfile.StudentId}
        onChange={onInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Major"
        name="Major"
        value={userProfile.Major}
        onChange={onInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Instagram"
        name="IG"
        value={userProfile.IG}
        onChange={onInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Line ID"
        name="LineID"
        value={userProfile.LineID}
        onChange={onInputChange}
        fullWidth
        margin="normal"
      />

      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default EditProfileForm;
