'use client';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '100px auto',
};

export const LoadingSpinner = () => {
  return <ClipLoader color="#10b981" size={150} cssOverride={override} aria-label="Loading Spinner" />;
};

const smallOverride = {
  display: 'block',
  margin: '20px auto',
};

export const SmallLoadingSpinner = () => {
  return <ClipLoader color="#10b981" size={25} cssOverride={smallOverride} aria-label="Loading Spinner" />;
};
