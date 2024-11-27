import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [verifying, setVerifying] = useState(false);
  const verifyUser = async () => {
    const response = await axios.put(
      `/api/subscribers/verify-user/${id}/${token}`
    );
    if (response.status === 200) {
      setVerifying(true);
    }
  };
  useEffect(() => {
    if (verifying) {
      navigate('/');
    }
    verifyUser();
  }, [verifying]);
  return <div>Verifying</div>;
};

export default Index;
