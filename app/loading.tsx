'use client';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '100px auto',
};

const loading = () => {
  return <ClipLoader color="#10b981" size={150} cssOverride={override} aria-label="Loading Spinner" />;
};

export default loading;
