import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Private = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Private Dashboard</h4>
            </div>
            <div className="card-body">
              <h5 className="card-title">Welcome to your Private Dashboard!</h5>
              <p className="card-text">
                You're logged in with email: <strong>{user?.email}</strong>
              </p>
              <p className="card-text">
                This is a protected area that can only be accessed by authenticated users.
              </p>
              <hr />
              <div className="alert alert-info">
                <h6>What can you do here?</h6>
                <ul>
                  <li>View your profile information</li>
                  <li>Manage your account settings</li>
                  <li>Access protected resources</li>
                  <li>And much more!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};